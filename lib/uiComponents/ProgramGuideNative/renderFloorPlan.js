// floorPlan: {
//   title: 'Demo Inn',
//   imageSrc,
//   clickableAreas: [
//     {
//       shape: 'rect',
//       coords: [0, 0, 800, 689],
//       href: 'https://www.lakeside-inn.com/images/floorplans/lakeside-floorplans-all.jpg',
//       alt: 'See full map',
//     },
//   ],
// },

import { mapString, runMethod } from '../../utilities'

const renderFloorPlan = ({ floorPlan }) => {
  const { title, imageSrc, clickableAreas } = floorPlan
  const showMap = clickableAreas.length > 0
  return /* html */`
    <div class="pg-floor-plan-wrapper">
      <header class="pg-floor-plan-header">
        <button class="pg-floor-plan-menu-button" onclick="${runMethod('toggleSortDialog', true)}">
          <i class="pg-more-icon" title="Options..."></i>
        </button>
        <h1 class="pg-floor-plan-title">${title}</h1>
      </header>
      <div class="pg-floor-plan-image-wrapper">
        ${showMap
          ? /* html */`
            <map name="floorPlan">
              ${mapString(clickableAreas, ({ shape, coords, href, target, alt }) => /* html */`
                <area
                  shape="${shape}"
                  coords="${coords.join(',')}"
                  href="${href}"
                  target="${target}"
                  rel="noopener noreferrer"
                  alt="${alt}"
                />
              `)
              }
            </map>`
          : ''
        }
        <img class="pg-floor-plan-image" src="${imageSrc}" ${showMap ? 'usemap="#floorPlan"' : ''}/>
      </div>
    </div>
  `
}

export default renderFloorPlan
