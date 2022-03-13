import { mapString, runMethod, getMarkerCoords } from '../../../utilities'

const renderFloorPlan = ({ floorPlan, floorPlanInteractive, marker }) => {
  const { title, clickableAreas, dimensions } = floorPlan
  const { height, width } = dimensions
  const showMap = clickableAreas.length > 0 && floorPlanInteractive
  const markerCoords = marker !== 'none' ? getMarkerCoords(marker, clickableAreas) : []
  const [x, y] = markerCoords

  return /* html */`
    <div class="pg-floor-plan-wrapper">
      <header class="pg-floor-plan-header">
        <button class="pg-floor-plan-menu-button" onclick="${runMethod('toggleSortDialog', true)}">
          <i class="pg-more-icon" title="Options..."></i>
        </button>
        <h1 class="pg-floor-plan-title">${title}</h1>
      </header>
      <div class="pg-floor-plan-container">
        <menu class="pg-floor-plan-menu">
          <button class="pg-floor-plan-interactive-button" onclick="${runMethod('toggleFloorPlanInteractive', null)}">
            <i class="pg-search-icon"></i> ${floorPlanInteractive ? 'Fit to Screen' : 'Original Size'}
          </button>
          ${clickableAreas.length > 0
            ? (floorPlanInteractive
                ? /* html */`<span class="pg-inline-text">Select an area for details.</span>`
                : /* html */`<span class="pg-inline-text">View original size for more actions.</span>`
              )
            : ''
          }
        </menu>

        ${showMap
          ? /* html */`
            <map name="floorPlan">
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

        <div class="pg-floor-plan-image-wrapper">
          <!-- This gets replaced by the image element stored in memory for optimization -->
          <img class="pg-floor-plan-image" height="${height}" width="${width}" />
          ${x && y && showMap
            ? /* html */`
              <div class="pg-floor-plan-marker" style="--x: ${x}; --y: ${y}">
                <i class="pg-map-icon"></i>
              </div>`
            : ''
          }
        </div>
      </div>
    </div>
  `
}

export default renderFloorPlan