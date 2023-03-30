import { setConfig } from '@faustwp/core';
import templates from './wp-templates';
import possibleTypes from './possibleTypes.json';
import { LocaleTemplatePlugin } from './plugins/LocaleTemplates';

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [
    new LocaleTemplatePlugin()
  ],
  experimentalToolbar: true,
  possibleTypes,
});
