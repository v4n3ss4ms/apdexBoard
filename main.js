import { AppsData } from './repository/appsData.js';
import { DataRepository } from './repository/dataRepository.js';
import { GetAllDataAvailable } from './repository/getAllDataAvailable.js';

import { gridView } from './view/view.js';

const dataRepository = new DataRepository(window.fetch);
const getAllDataAvailable = new GetAllDataAvailable(dataRepository);

const ELEMENT_ID = 'gridModeSolutionUI';
const DOM_ELEMENT = document.getElementById(ELEMENT_ID);
const GRID_OR_LIST_JS_CLASS = 'gridOrListCheck';
const GRID_OR_LIST_CHECK = document.getElementsByClassName(
  GRID_OR_LIST_JS_CLASS
)[0];
const LOAD_ERROR = `Ups... data couldn't be loaded`;
const LIST_CSS_CLASS = 'content--list';

/**
 * Set show grid or list checkbox availability
 * @param {Boolean} isAvailable
 */
const setCheckBoxAvailability = (isAvailable) => {
  GRID_OR_LIST_CHECK.disabled = !isAvailable;
};

/**
 * Utility function for toggling between grid and list view
 */
const toggleGridListView = () => {
  DOM_ELEMENT.classList.toggle(LIST_CSS_CLASS);
};

const init = async () => {
  const data = await getAllDataAvailable.execute();
  const appsData = new AppsData(data);
  setCheckBoxAvailability(true);
  GRID_OR_LIST_CHECK.addEventListener('click', () => toggleGridListView());
  gridView(appsData.getTopAppsByApdex(), DOM_ELEMENT);
};

try {
  init();
} catch (e) {
  DOM_ELEMENT.innerHTML = LOAD_ERROR;
  setCheckBoxAvailability(false);
  console.error(e);
}
