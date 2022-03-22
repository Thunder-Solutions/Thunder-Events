import { mapString, runMethod, getMarkerCoords } from '../../../utilities'

const renderFloorPlan = ({ floorPlan, floorPlanInteractive, marker }) => {
  const { title, clickableAreas, dimensions } = floorPlan
  const { height, width } = dimensions
  const showMap = clickableAreas.length > 0 && floorPlanInteractive
  const markerCoords = marker !== 'none' ? getMarkerCoords(marker, clickableAreas) : []
  const [x, y] = markerCoords
  const zoomButtonText = floorPlanInteractive ? 'Fit to Screen' : 'Original Size'

  return /* html */`
    <div class="pg-floor-plan-wrapper">
      <header class="pg-floor-plan-header">
        <menu class="pg-floor-plan-menu">
          <div class="pg-floor-plan-menu-section">
            <button class="pg-floor-plan-interactive-button" onclick="${runMethod('toggleFloorPlanInteractive', null)}">
              <i class="pg-search-icon" title="${zoomButtonText}"></i> ${zoomButtonText}
            </button>
            ${clickableAreas.length > 0
              ? (floorPlanInteractive
                  ? /* html */`<span class="pg-inline-text">Select an area for details.</span>`
                  : /* html */`<span class="pg-inline-text">View original size for more actions.</span>`
                )
              : ''
            }
          </div>
        </menu>
        <h1 class="pg-floor-plan-title">${title}</h1>
      </header>
      <div class="pg-floor-plan-container">

        ${showMap
          ? /* html */`
            <map name="floorPlan" id="floorPlan">
              ${mapString(clickableAreas, ({ shape, coords, href, alt, location: _location }) => {
                const fullHref = href.startsWith(':') ? `http${href}`
                  : href.startsWith('//') ? `http:${href}`
                  : href
                const isExternalLink = fullHref.startsWith('http')
                  && new URL(fullHref).hostname !== location.hostname
                return /* html */`
                  <area
                    shape="${shape}"
                    coords="${coords.join(',')}"
                    href="${href}"
                    ${isExternalLink ? `
                      target="_blank"
                      rel="noopener noreferrer"
                    ` : ''
                    }
                    alt="${alt ?? _location}"
                  />
                `
              })}
            </map>`
          : ''
        }

        <div class="pg-floor-plan-image-wrapper ${showMap ? 'pg-floor-plan-image-wrapper--interactive' : ''}" onclick="${runMethod('showFloorPlanMessage', 'event', 'No link was provided for that area.')}">

          <!-- This exists to prevent a safari OCR bug from interfering with the image map -->
          <img
            class="pg-overlay-image"
            ${showMap ? 'usemap="#floorPlan"' : ''}
            height="${height}"
            width="${width}"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQUE0RjNBMEE0MDkxMUVDOTAwN0ZBRjQwRjZGNkFBMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQUE0RjNBMUE0MDkxMUVDOTAwN0ZBRjQwRjZGNkFBMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFBQTRGMzlFQTQwOTExRUM5MDA3RkFGNDBGNkY2QUEyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFBQTRGMzlGQTQwOTExRUM5MDA3RkFGNDBGNkY2QUEyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAAAsAAAAAAEAAQAAAgJEAQA7"
          />

          <!-- This gets replaced by the image element stored in memory for optimization -->
          <img class="pg-floor-plan-image" height="${height}" width="${width}" />
          ${x && y && showMap
            ? /* html */`
              <div class="pg-floor-plan-marker" style="--x: ${x}px; --y: ${y}px">
                <i class="pg-map-icon"></i>
              </div>`
            : ''
          }
          <div class="pg-floor-plan-message" role="alert"></div>
        </div>
      </div>
    </div>
  `
}

export default renderFloorPlan
