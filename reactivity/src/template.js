import template from 'lodash/template'

const compileOptions = {
  escape: /{{([^{][\s\S]+?[^}])}}/g,
  interpolate: /{{{([\s\S]+?)}}}/g
}

export const compile=(html)=>template(html,compileOptions)

// console.log(template(testHtml,compileOptions))