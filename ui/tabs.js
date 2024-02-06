
// tabs.js

function onFirstLoad(build_spec){
      let data = build_spec
      initSchema(data["x-enum"])
      initTag(data["x-tags"])
      loadExample(data["x-examples"])
      //addExample("on-demand")
      loadFlows(data["x-flows"])
      loadErrors(data["x-errors"])
      loadAttributes(data["x-attributes"])
}

window.onload = function(){
      onFirstLoad(build_spec)
} 