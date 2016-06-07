"use strict"

const PostHTML = require("posthtml")

const html =
`
    <div class="col-lg-6 col-md-push-5 col-sm-4"></div>
    <div class="col-lg-1 col-md-2 col-sm-3 js-example"></div>
    <div class="js-temp"></div>
    <ul>
        <li class="js-temp"></li>
        <li class="col-lg-6 col-md-push-5 col-sm-4"></li>
        <li class="col-lg-1 col-md-2 col-sm-3 js-example"></li>
    </ul>
`
const bootstrapPattern = /col-(xs|sm|md|lg)?(-\w+)?-\d+/i;

const plugin = tree => tree.match({ attrs: {class: true} }, node => {
    let classSet = node.attrs.class.split(' ')
    classSet.forEach( (item, index, arr) => 
    {
        if( bootstrapPattern.test(item))
        {
            arr[index] = ''
        }

        if( item.startsWith('js-') )
        {
            arr[index] = `data-${item}`
        }
    })

    classSet = classSet.filter( item => {
        return item !== ''
    })

    classSet.length 
        ? node.attrs.class = classSet.join(' ')
        : node.attrs.class = false
    
    return node
})
    

PostHTML([ plugin ])
    .process(html)
    .then(result =>
    {
        console.log(result.html)
    })
    .catch(console.error)