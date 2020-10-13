// Import Libs and Runtime
import * React from "react";
import { AppRender, injectReadonly, injectStyle } from "/Users/huqingyang/Desktop/Proj/vize/packages/generator-web/test/deps/runtime-web";

// Import Components
import universal_button from "/Users/huqingyang/Desktop/Proj/vize/packages/generator-web/test/libs/universal/src/components/button";
import universal_text from "/Users/huqingyang/Desktop/Proj/vize/packages/generator-web/test/libs/universal/src/components/text";
import universal_container from "/Users/huqingyang/Desktop/Proj/vize/packages/generator-web/test/libs/universal/src/components/container";
import universal_containerwithtitle from "/Users/huqingyang/Desktop/Proj/vize/packages/generator-web/test/libs/universal/src/components/containerwithtitle";
import universal_image from "/Users/huqingyang/Desktop/Proj/vize/packages/generator-web/test/libs/universal/src/components/image";

// Import Plugins
import universal_share from "/Users/huqingyang/Desktop/Proj/vize/packages/generator-web/test/libs/universal/src/plugins/share";

// Import Actions
import universal_alert from "/Users/huqingyang/Desktop/Proj/vize/packages/generator-web/test/libs/universal/src/actions/alert";

// Global Style
injectStyle(`body {
	margin: [object Object] !important;
padding: [object Object] !important;
border: [object Object] !important;
background: [object Object] !important;
}`, 'vize_injected-global-styles');

// Auto Inject Style
injectStyle(``, 'vize_auto_injected-component-styles');

// Global Data
const meta = {"title":"vize page","desc":"","duration":null,"expiredJump":""};
const global = {};

// Inject Global
injectReadonly('VIZE', { meta, global });

// Actions
const actionsMaterialMap = { universal_alert };

// Components
const componentsMaterialMap = { universal_button, universal_text, universal_container, universal_containerwithtitle, universal_image } as React.ComponentProps<typeof AppRender>['componentsMaterialMap'];
const componentInstances = [{"key":6,"component":"universal_button","lib":"universal","data":{"text":"按钮"},"style":{},"commonStyle":{"size":{"autoWidth":true,"width":200,"autoHeight":true,"height":80},"transform":{"rotate":0,"opacity":1,"scale":1,"radius":0},"text":{"color":"#161616","fontSize":14,"lineHeight":20,"textAlign":"center","weight":"normal"},"border":{"type":"none","color":"#161616","width":1},"background":{"color":"transparent","image":"","size":"auto","position":"center top","repeat":"repeat-y"},"margin":{"top":12,"left":0,"bottom":12,"right":0},"padding":{"top":0,"left":8,"bottom":0,"right":8},"zIndex":true,"position":true},"wrapperStyle":{"background":{"color":"transparent","image":"","size":"auto","position":"center top","repeat":"repeat-y"}},"events":[{"key":7,"data":{},"trigger":{"type":"component_universal_trigger","triggerName":"__vize_component_event_trigger_click"},"target":{"type":"action","id":"universal_alert","lib":"universal"},"events":[]}]},{"key":7,"component":"universal_container","lib":"universal","data":{},"style":{},"commonStyle":{"size":{"autoWidth":true,"width":200,"autoHeight":true,"height":80},"transform":{"rotate":0,"opacity":1,"scale":1,"radius":0},"text":{"color":"#161616","fontSize":14,"lineHeight":20,"textAlign":"center","weight":"normal"},"border":{"type":"none","color":"#161616","width":1},"background":{"color":"transparent","image":"","size":"auto","position":"center top","repeat":"repeat-y"},"margin":{"top":0,"left":"auto","bottom":0,"right":"auto"},"padding":{"top":0,"left":0,"bottom":0,"right":0},"zIndex":true,"position":true},"wrapperStyle":{},"events":[],"children":[{"key":11,"component":"universal_button","lib":"universal","data":{"text":"按钮"},"style":{},"commonStyle":{"size":{"autoWidth":true,"width":200,"autoHeight":true,"height":80},"transform":{"rotate":0,"opacity":1,"scale":1,"radius":0},"text":{"color":"#161616","fontSize":14,"lineHeight":20,"textAlign":"center","weight":"normal"},"border":{"type":"none","color":"#161616","width":1},"background":{"color":"transparent","image":"","size":"auto","position":"center top","repeat":"repeat-y"},"margin":{"top":12,"left":0,"bottom":12,"right":0},"padding":{"top":0,"left":8,"bottom":0,"right":8},"zIndex":true,"position":true},"wrapperStyle":{"background":{"color":"transparent","image":"","size":"auto","position":"center top","repeat":"repeat-y"}},"events":[]},{"key":12,"component":"universal_text","lib":"universal","data":{"text":"输入文本内容..."},"style":{},"commonStyle":{"size":{"autoWidth":true,"width":200,"autoHeight":true,"height":80},"transform":{"rotate":0,"opacity":1,"scale":1,"radius":0},"text":{"color":"#161616","fontSize":14,"lineHeight":20,"textAlign":"center","weight":"normal"},"border":{"type":"none","color":"#161616","width":1},"background":{"color":"transparent","image":"","size":"auto","position":"center top","repeat":"repeat-y"},"margin":{"top":12,"left":0,"bottom":12,"right":0},"padding":{"top":0,"left":8,"bottom":0,"right":8},"zIndex":true,"position":true},"wrapperStyle":{},"events":[]}]},{"key":8,"component":"universal_containerwithtitle","lib":"universal","data":{},"style":{},"commonStyle":{},"wrapperStyle":{},"events":[],"children":[]},{"key":9,"component":"universal_image","lib":"universal","data":{"src":"https://img.alicdn.com/tfs/TB1PibhR4D1gK0jSZFsXXbldVXa-512-416.png"},"style":{},"commonStyle":{"size":{"autoWidth":true,"width":200,"autoHeight":true,"height":80},"transform":{"rotate":0,"opacity":1,"scale":1,"radius":0},"border":{"type":"none","color":"#161616","width":1},"margin":{"top":0,"left":"auto","bottom":0,"right":"auto"},"padding":{"top":0,"left":0,"bottom":0,"right":0},"zIndex":true,"position":true},"wrapperStyle":{"background":{"color":"transparent","image":"","size":"auto","position":"center top","repeat":"repeat-y"}},"events":[],"hotAreas":[]},{"key":10,"component":"universal_text","lib":"universal","data":{"text":"输入文本内容..."},"style":{},"commonStyle":{"size":{"autoWidth":true,"width":200,"autoHeight":true,"height":80},"transform":{"rotate":0,"opacity":1,"scale":1,"radius":0},"text":{"color":"#161616","fontSize":14,"lineHeight":20,"textAlign":"center","weight":"normal"},"border":{"type":"none","color":"#161616","width":1},"background":{"color":"transparent","image":"","size":"auto","position":"center top","repeat":"repeat-y"},"margin":{"top":12,"left":0,"bottom":12,"right":0},"padding":{"top":0,"left":8,"bottom":0,"right":8},"zIndex":true,"position":true},"wrapperStyle":{},"events":[]}] as React.ComponentProps<typeof AppRender>['componentInstances'];

// Plugin
const pluginsMaterialMap = { universal_share } as React.ComponentProps<typeof AppRender>['pluginsMaterialMap'];
const pluginInstances = [{"key":3,"plugin":"universal_share","lib":"universal","data":{"wording":"分享完成"},"events":[]}] as React.ComponentProps<typeof AppRender>['pluginInstances'] ;

export function App() {
  return (
    <AppRender
      global={global}
      meta={meta}
      actionsMaterialMap={actionsMaterialMap}
      componentsMaterialMap={componentsMaterialMap}
      componentInstances={componentInstances}
      pluginsMaterialMap={pluginsMaterialMap}
      pluginInstances={pluginInstances}
    />
  );
}
