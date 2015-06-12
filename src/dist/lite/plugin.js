/* Source version: 1.2.13 */
(function(g){var w={Events:{INIT:"lite:init",ACCEPT:"lite:accept",REJECT:"lite:reject",SHOW_HIDE:"lite:showHide",TRACKING:"lite:tracking",CHANGE:"lite:change",HOVER_IN:"lite:hover-in",HOVER_OUT:"lite:hover-out"},Commands:{TOGGLE_TRACKING:"lite-toggletracking",TOGGLE_SHOW:"lite-toggleshow",ACCEPT_ALL:"lite-acceptall",REJECT_ALL:"lite-rejectall",ACCEPT_ONE:"lite-acceptone",REJECT_ONE:"lite-rejectone",TOGGLE_TOOLTIPS:"lite-toggletooltips"}},q={show:true,path:"js/opentip-adapter.js",classPath:"OpentipAdapter",cssPath:"css/opentip.css",delay:500},t="%a by %u %t",h=/^[\s\r\n]*$/,y=[{regex:/[\s]*title=\"[^\"]+\"/g,replace:""},{regex:/[\s]*data-selected=\"[^\"]+\"/g,replace:""}],m=[],x=[g.CTRL+88,g.CTRL+120,g.SHIFT+46],e=false,i=false;function d(G){var C,B,F,E,A,H;if(G.nodeType===ice.dom.ELEMENT_NODE){var D=G.childNodes;for(E=0;E<D.length;++E){H=D[E];d(H);B=H.nodeName.toLowerCase();if(B==="ins"||B==="del"){while(H.firstChild){G.insertBefore(H.firstChild,H)}G.removeChild(H)}}}B=G.nodeName.toLowerCase();if(B==="ins"||B==="del"){C=jQuery.makeArray(G.childNodes)}else{C=[G]}return C}function j(A){if(!A||!A.length){return[]}var B=[];A.forEach(function(C){B=B.concat(d(C))});return B}function o(A){return x.indexOf(A)>=0}function l(A){if(A&&A.$&&(typeof A.getDocument==="function")){return A.$}return A}function n(B){for(var A=m.length;A--;){var C=m[A];if(C.editor==B){return A}}return -1}function c(A){var B=n(A);return B>=0?m[B]:null}function p(A){var B=c(A);return B&&B.plugin}function s(A,B){m.push({plugin:B,editor:A})}function v(C,D,A,F){if(null===C||(typeof(C)=="undefined")){C=""}else{C=String(C)}A=String(A);var E=A.length;for(var B=C.length;B<D;B+=E){if(F){C+=A}else{C=A+C}}return C}function z(A,B){return v(A,B,"0")}function a(C){var B=new Date(),G=B.getDate(),E=B.getMonth(),F=B.getFullYear(),D,H;var I=typeof(C);if(I=="string"||I=="number"){C=new Date(C)}var A=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];if(G==C.getDate()&&E==C.getMonth()&&F==C.getFullYear()){D=Math.floor((B.getTime()-C.getTime())/60000);if(D<1){return"now"}else{if(D<2){return"1 minute ago"}else{if(D<60){return(D+" minutes ago")}else{H=C.getHours();D=C.getMinutes();return"on "+z(H,2)+":"+z(D,2,"0")}}}}else{if(F==C.getFullYear()){return"on "+A[C.getMonth()]+" "+C.getDate()}else{return"on "+A[C.getMonth()]+" "+C.getDate()+", "+C.getFullYear()}}}function u(){if(e){return}e=true;var A=parseFloat(g.version);i=isNaN(A)||A<4.4}g.plugins.add("lite",{icons:"lite-acceptall,lite-acceptone,lite-rejectall,lite-rejectone,lite-toggleshow,lite-toggletracking",hidpi:true,props:{deleteTag:"del",insertTag:"ins",deleteClass:"ice-del",insertClass:"ice-ins",attributes:{changeId:"data-cid",userId:"data-userid",userName:"data-username",sessionId:"data-session-id",changeData:"data-changedata",time:"data-time",lastTime:"data-last-change-time"},stylePrefix:"ice-cts",preserveOnPaste:"p",css:"css/lite.css"},_scriptsLoaded:null,init:function(H){u();var E=c(H);if(E){return}var M=this.path,G=new f(this.props,M),A=g.tools.extend({},H.config.lite||{}),J=A.tooltips;if(undefined==J){J=true}if(J===true){J=q}A.tooltips=J;s(H,G);G.init(H,A);H.on("destroy",(function(N){var O=n(N);if(O>=0){m.splice(O,1)}}).bind(this));if(this._scriptsLoaded){G._onScriptsLoaded();return}else{if(this._scriptsLoaded===false){return}}this._scriptsLoaded=false;var B=(typeof(jQuery)=="function"),L=this,C=A.jQueryPath||"js/jquery.min.js",D=(A.includeType?A["includes_"+A.includeType]:A.includes)||["lite-includes.js"];D=D.slice();for(var F=0,I=D.length;F<I;++F){D[F]=M+D[F]}if(!B){D.splice(0,0,this.path+C)}if(J.path){D.push(this.path+J.path)}var K=function(){if(D.length<1){L._scriptsLoaded=true;if(!B){jQuery.noConflict()}jQuery.each(m,(function(O,P){P.plugin._onScriptsLoaded()}))}else{var N=D.shift();g.scriptLoader.load(N,function(){K()},L)}};K(D)},findPlugin:function(A){return p(A)},startNewSession:function(A){var B=p(A);if(B){B.startNewSession()}else{b("startNewSession: plugin not found")}}});var f=function(A,B){this.props=g.tools.clone(A);this.path=B};f.prototype={init:function(H,D){this._editor=H;this._domLoaded=false;this._editor=null;this._tracker=null;this._isVisible=true;this._liteCommandNames=[];this._canAcceptReject=true;this._removeBindings=[];H.ui.addToolbarGroup("lite");this._setPluginFeatures(H,this.props);this._changeTimeout=null;this._notifyChange=this._notifyChange.bind(this);this._notifyTextChange=this._notifyTextChange.bind(this);this._config=D;var A=D.acceptRejectInReadOnly===true;var B=[{command:w.Commands.TOGGLE_TRACKING,exec:this._onToggleTracking,title:"Toggle Tracking Changes",trackingOnly:false},{command:w.Commands.TOGGLE_SHOW,exec:this._onToggleShow,title:"Toggle Tracking Changes",readOnly:true},{command:w.Commands.ACCEPT_ALL,exec:this._onAcceptAll,title:"Accept all changes",readOnly:A},{command:w.Commands.REJECT_ALL,exec:this._onRejectAll,title:"Reject all changes",readOnly:A},{command:w.Commands.ACCEPT_ONE,exec:this._onAcceptOne,title:"Accept Change",readOnly:A},{command:w.Commands.REJECT_ONE,exec:this._onRejectOne,title:"Reject Change",readOnly:A},{command:w.Commands.TOGGLE_TOOLTIPS,exec:this._onToggleTooltips,readOnly:true}];this._isTracking=D.isTracking!==false;this._eventsBounds=false;H.on("contentDom",(function(L){this._onDomLoaded(L)}).bind(this));H.on("dataReady",(function(L){this._onAfterSetData(L)}).bind(this));var K=this.path;var C=D.commands||[w.Commands.TOGGLE_TRACKING,w.Commands.TOGGLE_SHOW,w.Commands.ACCEPT_ALL,w.Commands.REJECT_ALL,w.Commands.ACCEPT_ONE,w.Commands.REJECT_ONE];var J=this;function G(M){H.addCommand(M.command,{exec:M.exec.bind(J),readOnly:M.readOnly||false});if(M.title&&C.indexOf(M.command)>=0){var L=J._commandNameToUIName(M.command);H.ui.addButton(L,{label:M.title,command:M.command,toolbar:"lite"});if(M.trackingOnly!==false){J._liteCommandNames.push(M.command)}}}for(var F=0,I=B.length;F<I;++F){G(B[F])}if(H.addMenuItems){H.addMenuGroup("lite",50);var E={};E[w.Commands.ACCEPT_ONE]={label:"Accept Change",command:w.Commands.ACCEPT_ONE,group:"lite",order:1,icon:K+"icons/accept_one.png"};E[w.Commands.REJECT_ONE]={label:"Reject Change",command:w.Commands.REJECT_ONE,group:"lite",order:2,icon:K+"icons/reject_one.png"};H.addMenuItems(E)}if(H.contextMenu){H.contextMenu.addListener((function(M){if(M&&this._tracker&&this._tracker.currentChangeNode(M)){var L={};L[w.Commands.ACCEPT_ONE]=g.TRISTATE_OFF;L[w.Commands.REJECT_ONE]=g.TRISTATE_OFF;return L}else{return null}}).bind(this))}},toggleTracking:function(A,B){if("boolean"===typeof B){B={notify:B}}B=B||{};var G=(undefined===A)?!this._isTracking:A,F=this._editor,E=B&&B.force;if(!G&&this._isTracking&&!E){var C=this._tracker.countChanges({verify:true});if(C){return window.alert("Your document containssome pending changes.\nPlease resolve them before turning off change tracking.")}}this._isTracking=G;this._setCommandsState(this._liteCommandNames,G?g.TRISTATE_OFF:g.TRISTATE_DISABLED);this._updateTrackingState();this.toggleShow(G,false);this._setCommandsState(w.Commands.TOGGLE_TRACKING,G?g.TRISTATE_ON:g.TRISTATE_OFF);var D=F.ui.get(this._commandNameToUIName(w.Commands.TOGGLE_TRACKING));if(D){this._setButtonTitle(D,G?"Stop tracking changes":"Start tracking changes")}if(B.notify!==false){F.fire(w.Events.TRACKING,{tracking:G,lite:this})}},toggleShow:function(A,B){var D=(typeof(A)=="undefined")?(!this._isVisible):A;this._isVisible=D;if(this._isTracking){this._setCommandsState(w.Commands.TOGGLE_SHOW,D?g.TRISTATE_ON:g.TRISTATE_OFF)}this._tracker.setShowChanges(D&&this._isTracking);var C=this._editor.ui.get(this._commandNameToUIName(w.Commands.TOGGLE_SHOW));if(C){this._setButtonTitle(C,D?"Hide tracked changes":"Show tracked changes")}if(B!==false){this._editor.fire(w.Events.SHOW_HIDE,{show:D,lite:this})}},isVisible:function(){return this._isVisible},isTracking:function(){return this._isTracking},acceptAll:function(A){this._tracker.acceptAll(A);this._cleanup();this._editor.fire(w.Events.ACCEPT,{lite:this,options:A})},rejectAll:function(A){this._tracker.rejectAll(A);this._cleanup();this._editor.fire(w.Events.REJECT,{lite:this,options:A})},setUserInfo:function(A){A=A||{};this._config.userId=String(A.id);this._config.userName=A.name||"";if(this._tracker){this._tracker.setCurrentUser({id:this._config.userId,name:this._config.userName})}},countChanges:function(A){return((this._tracker&&this._tracker.countChanges(A))||0)},enableAcceptReject:function(A){this._canAcceptReject=!!A;this._onIceChange()},filterIceElement:function(A){if(!A){return true}try{if(A.hasClass(this.props.insertClass)||A.hasClass(this.props.deleteClass)){return false}}catch(A){}return true},startNewSession:function(){var A=new Date();this._sessionId=String.fromCharCode(65+Math.round(Math.random()*26))+A.getDate()+A.getDay()+A.getHours()+A.getMinutes()+A.getMilliseconds();if(this._tracker){this._tracker.setSessionId(this._sessionId)}},getCleanMarkup:function(B){if(null===B||undefined===B){B=(this._editor&&this._editor.getData())||""}for(var A=y.length-1;A>=0;--A){B=B.replace(y[A].regex,y[A].replace)}return B},getCleanText:function(){var A=this._getBody();if(!A){return""}var C=[];C.push("");var B=this._tracker.getDeleteClass();this._getCleanText(A,C,B);var D=C.join("\n");D=D.replace(/&nbsp(;)?/ig," ");return D},acceptChange:function(A){A=l(A);if(A&&this._tracker){this._tracker.acceptChange(A);this._cleanup();this._editor.fire(w.Events.ACCEPT,{lite:this});this._onSelectionChanged(null)}},rejectChange:function(A){A=l(A);if(A&&this._tracker){this._tracker.rejectChange(A);this._cleanup();this._editor.fire(w.Events.REJECT,{lite:this});this._onSelectionChanged(null)}},_getCleanText:function(F,E,D){var C=F.getAttribute("class");if(C&&C.indexOf(D)>=0){return}var A;if(A=((F.nodeName&&F.nodeName.toUpperCase()=="BR")||("block"==jQuery(F).css("display")))){if(h.test(E[E.length-1])){E[E.length-1]=""}else{E.push("")}}for(var G=F.firstChild;G;G=G.nextSibling){var B=G.nodeType;if(3==B){E[E.length-1]+=String(G.nodeValue)}else{if(1==B||9==B||11==B){this._getCleanText(G,E,D)}}}if(A){E.push("")}},_onDomLoaded:function(B){this._domLoaded=true;this._editor=B.editor;var A=this._editor.editable();A.attachListener(A,"mousedown",this._onMouseDown,this,null,1);A.attachListener(A,"keypress",this._onKeyPress,this,null,1);this._hideTooltip();this._onReady()},_onScriptsLoaded:function(){this._scriptsLoaded=true;this._onReady()},_loadCSS:function(D,B){var A=D.getElementsByTagName("head")[0];function C(F,G){var E=jQuery(A).find("#"+G);if(!E.length){E=D.createElement("link");E.setAttribute("rel","stylesheet");E.setAttribute("type","text/css");E.setAttribute("id",G);E.setAttribute("href",F);A.appendChild(E)}}C(this.path+B,"__lite__css__");if(this._config.tooltips.cssPath){C(this.path+this._config.tooltips.cssPath,"__lite_tt_css__")}},_onReady:function(){if(!this._scriptsLoaded||!this._domLoaded){return}setTimeout(this._afterReady.bind(this),5)},_getBody:function(){try{return this._editor.editable().$}catch(A){return null}},_afterReady:function(){var H=this._editor,G=H.document.$,A=this._getBody(),D=this._config,B=(D&&D.debug)||{};this._loadCSS(G,(D&&D.cssPath)||"css/lite.css");if(!this._eventsBounds){this._eventsBounds=true;var F=this._onPaste.bind(this);H.on("afterCommandExec",this._onAfterCommand.bind(this));H.on("beforeCommandExec",this._onBeforeCommand.bind(this));if(this._config.handlePaste){H.on("paste",F,null,null,1)}H.on("beforeGetData",this._onBeforeGetData.bind(this));H.on("beoreUndoImage",this._onBeforeGetData.bind(this));H.on("insertHtml",F,null,null,1);H.on("insertText",F,null,null,1);H.on("insertElement",F,null,null,1);H.on("mode",this._onModeChange.bind(this),null,null,1);H.on("readOnly",this._onReadOnly.bind(this))}if(this._tracker){if(A!=this._tracker.getContentElement()){this._tracker.stopTracking(true);jQuery(this._tracker).unbind();this._tracker=null}}if(this._tracker){return}var C={element:A,mergeBlocks:false,currentUser:{id:D.userId||"",name:D.userName||""},userStyles:D.userStyles,changeTypes:{insertType:{tag:this.props.insertTag,alias:this.props.insertClass,action:"Inserted"},deleteType:{tag:this.props.deleteTag,alias:this.props.deleteClass,action:"Deleted"}},hostMethods:{getHostRange:this._getHostRange.bind(this),getHostRangeData:this._getHostRangeData.bind(this),makeHostElement:function(I){return new g.dom.element(I)},getHostNode:function(I){return I&&I.$},setHostRange:this._setHostRange.bind(this),hostCopy:this._hostCopy.bind(this),beforeEdit:this._beforeEdit.bind(this),notifyChange:this._afterEdit.bind(this)}};if(B.log){C.hostMethods.logError=b}C.tooltips=D.tooltips.show;if(C.tooltips){var E=this._hideTooltip.bind(this);C.hostMethods.showTooltip=this._showTooltip.bind(this);C.hostMethods.hideTooltip=E;C.hostMethods.beforeDelete=C.hostMethods.beforeInsert=E;if(D.tooltips.classPath){try{this._tooltipsHandler=new window[D.tooltips.classPath]();C.tooltipsDelay=D.tooltips.delay}catch(H){}if(!this._tooltipsHandler){b("Unable to create tooltip handler",D.tooltips.classPath)}else{this._tooltipsHandler.init(D.tooltips)}}}jQuery.extend(C,this.props);this._tracker=new ice.InlineChangeEditor(C);try{this._tracker.startTracking();this.toggleTracking(this._isTracking,false);this._updateTrackingState();jQuery(this._tracker).on("change",this._onIceChange.bind(this)).on("textChange",this._onIceTextChanged.bind(this));H.fire(w.Events.INIT,{lite:this});this._onSelectionChanged(null);this._onIceChange(null)}catch(H){b("ICE plugin init:",H)}},_onToggleShow:function(){this.toggleShow()},_onToggleTracking:function(){this.toggleTracking()},_onRejectAll:function(){this.rejectAll()},_onAcceptAll:function(){this.acceptAll()},_onAcceptOne:function(){var A=this._tracker.currentChangeNode();return this.acceptChange(A)},_onRejectOne:function(){var A=this._tracker.currentChangeNode();return this.rejectChange(A)},_onToggleTooltips:function(){this._tracker&&this._tracker.toggleTooltips()},_cleanup:function(){var A=this._getBody(),B=jQuery(A).find(self.insertSelector+":empty,"+self.deleteSelector+":empty");B.remove();this._onSelectionChanged(null)},_setButtonTitle:function(A,C){var B=jQuery("#"+A._.id);B.attr("title",C)},_onAfterCommand:function(B){var A=this._tracker&&this._isTracking&&B.data&&B.data.name;if("undo"==A||"redo"==A){this._tracker.reload()}},_onBeforeCommand:function(B){var A=this._tracker&&this._tracker.isTracking()&&B.data&&B.data.name;if("cut"==A){if(k(this._editor,"copy")){this._tracker.prepareToCut()}}else{if("copy"==A){if(k(this._editor,"copy")){this._tracker.prepareToCopy()}}}},_onModeChange:function(A){this._updateTrackingState();setTimeout(this._onIceChange.bind(this),0)},_onKeyPress:function(A){var B=A&&A.data&&A.data.getKeystroke();if(o(B)){A.stop()}},_onKeyDown:function(A){if(!this._tracker||!this._tracker.isTracking()){return}var B=A.data.keyCode;if(o(B)){if(this._tracker.tryToCut()){A.stop()}}},_onMouseDown:function(){this._hideTooltip()},_onBeforeGetData:function(){this._hideTooltip()},_onAfterSetData:function(){this._hideTooltip();this._processContent();if(this._tracker){this._tracker.reload()}},_onReadOnly:function(){this._updateTrackingState()},_updateTrackingState:function(){if(this._tracker){var A=this._isTracking&&this._editor.mode=="wysiwyg"&&!this._editor.readOnly;this._tracker.toggleChangeTracking(A);for(var C=this._removeBindings.length-1;C>=0;--C){this._removeBindings[C].removeListener()}this._removeBindings=[];this._tracker.unlistenToEvents();if(A){var D=this._onSelectionChanged.bind(this),B=this._editor.editable();if(i){this._tracker.listenToEvents()}else{this._removeBindings.push(this._editor.on("key",function(F){if(this._tracker){var E=F.data.domEvent&&F.data.domEvent.$;return E?this._tracker.handleKeyDown(E):true}return true}.bind(this)))}this._removeBindings.push(B.on("keyup",this._onSelectionChanged.bind(this,null,false)));this._removeBindings.push(B.on("click",D));this._removeBindings.push(this._editor.on("selectionChange",D))}}},_onPaste:function(I){if(!this._tracker||!this._isTracking||!I){return true}var C=I.data||{},F=false,D=null,B=(I.name=="insertElement")&&C.$;if(!C){return}if("string"==typeof C){C={dataValue:C,type:"text"}}if(B){F=B.getAttribute("data-track-changes-ignore")}else{if(C.dataValue&&"html"==(C.type||C.mode)){try{B=jQuery(C.dataValue);F=B&&B.attr("data-track-changes-ignore")}catch(E){}}}if(F){return true}if("string"==typeof C.dataValue){try{var H=this._editor.document.$,A=H.createElement("div");A.innerHTML=String(C.dataValue);A=this._tracker.getCleanDOM(A);if(!A.innerHTML){return true}D=jQuery.makeArray(A.childNodes)}catch(E){b("ice plugin paste:",E)}}else{if(B){D=[B]}else{return true}}if(D){D=j(D);var G=this._editor.focusManager.hasFocus;this._beforeInsert();this._tracker.insert({nodes:D});this._afterInsert();if(G){this._editor.editable().focus()}}I.stop();this._onIceTextChanged();return true},_setCommandsState:function(A,D){if(typeof(A)=="string"){A=A.split(",")}for(var B=A.length-1;B>=0;--B){var C=this._editor.getCommand(A[B]);if(C){C.setState(D)}}},_onSelectionChanged:function(C,A){var B=this._isTracking&&this._tracker&&this._tracker.isInsideChange(null,null,A),D=B&&this._canAcceptReject?g.TRISTATE_OFF:g.TRISTATE_DISABLED;this._setCommandsState([w.Commands.ACCEPT_ONE,w.Commands.REJECT_ONE],D)},_onIceChange:function(C){var A=this._isTracking&&this._tracker&&this._tracker.hasChanges();var B=A&&this._canAcceptReject?g.TRISTATE_OFF:g.TRISTATE_DISABLED;this._setCommandsState([w.Commands.ACCEPT_ALL,w.Commands.REJECT_ALL],B);this._onSelectionChanged();if(C){this._triggerChange()}},_onIceTextChanged:function(A){this._triggerChange()},_triggerChange:function(){if(!this._changeTimeout){this._changeTimeout=setTimeout(this._notifyChange,1)}},_notifyChange:function(){this._changeTimeout=null;this._editor.fire(w.Events.CHANGE,{lite:this})},_notifyTextChange:function(){this._changeTimeout=null;this._editor.fire("change",{lite:this})},_processContent:function(){var A=this._getBody(),D=window.jQuery,G=this.props.insertTag,C=this.props.deleteTag,B,E;if(!A){return}E=A.ownerDocument;function F(K,H){var J=K.parentNode,I=E.createElement(H);D.each(K.attributes,function(M,L){I.setAttribute(L.name,L.value)});I.className=K.className||"";D(K).contents().appendTo(I);J.insertBefore(I,K);J.removeChild(K)}if(G!=="span"){B=D(A).find("span."+this.props.insertClass);B.each(function(H,I){F(I,G)})}if(C!=="span"){B=D(A).find("span."+this.props.deleteClass);B.each(function(H,I){F(I,C)})}},_commandNameToUIName:function(A){return A.replace(".","_")},_setPluginFeatures:function(F,H){function D(){return[H.deleteClass,H.insertClass,H.stylePrefix+"*"]}function A(){var J=["title"];for(var K in H.attributes){if(H.attributes.hasOwnProperty(K)){var L=H.attributes[K];if((typeof L==="string")&&L.indexOf("data-")===0){J.push(L)}}}return J}function C(J){var K={};J.forEach(function(L){K[L]=true});return K}if(!F||!F.filter||!F.filter.addFeature){return}try{var B=[],I,E;I={};E={};E.classes=C(D());E.attributes=C(A());I[H.insertTag]=E;I[H.deleteTag]=g.tools.clone(E);I.br=g.tools.clone(E);I.br.propertiesOnly=true;I.span=g.tools.clone(E);F.filter.addFeature({name:"lite-features",allowedContent:I})}catch(G){b(G)}},_setHostRange:function(A){var B=this._editor&&this._editor.getSelection();if(B){B.selectRanges([A])}},_afterEdit:function(){this._editor.fire("saveSnapshot")},_beforeEdit:function(){g.iscutting=true;var B=this._editor,A=function(){B.fire("saveSnapshot")};A();setTimeout(function(){g.iscutting=false},100)},_hostCopy:function(){try{if(g.env.ie){r(this._editor,"copy")}else{this._editor.document.$.execCommand("copy",false,null)}}catch(A){b(A)}},_getHostRange:function(){var C=this._editor&&this._editor.getSelection(),A=C&&C.getRanges(),B=A&&A[0];return B||null},_getHostRangeData:function(A){A=A||this._getHostRange();if(!A){return null}return{startContainer:A.startContainer&&A.startContainer.$,endContainer:A.endContainer&&A.endContainer.$,startOffset:A.startOffset,endOffset:A.endOffset}},_showTooltip:function(B,D){var A=this._config.tooltips;if(A.events){return this._editor&&this._editor.fire(w.Events.HOVER_IN,{lite:this,node:B,changeId:D.changeId})}if(A.show){var C=this._makeTooltipTitle(D);if(this._tooltipsHandler){this._tooltipsHandler.hideAll(this._getBody());this._tooltipsHandler.showTooltip(B,C,this._editor.container.$)}else{B.setAttribute("title",C)}}},_hideTooltip:function(C){var B=this._config.tooltips;if(B.events){return this._editor&&this._editor.fire(w.Events.HOVER_OUT,{lite:this,node:C})}if(this._tooltipsHandler){if(C){this._tooltipsHandler.hideTooltip(C)}else{this._tooltipsHandler.hideAll(this._getBody())}}else{if(this._tracker){if(C){C.removeAttribute("title")}else{var A=this._tracker.getIceNodes();if(A){A.removeAttr("title")}}}}},_beforeInsert:function(){this._editor.fire("saveSnapshot")},_afterInsert:function(){var A=this._editor;A.getSelection().scrollIntoView()},_makeTooltipTitle:function(D){var C=this._config.tooltipTemplate||t,B=new Date(D.time),A=new Date(D.lastTime);C=C.replace(/%a/g,"insert"==D.type?"added":"deleted");C=C.replace(/%t/g,a(B));C=C.replace(/%u/g,D.userName);C=C.replace(/%dd/g,z(B.getDate(),2));C=C.replace(/%d/g,B.getDate());C=C.replace(/%mm/g,z(B.getMonth()+1,2));C=C.replace(/%m/g,B.getMonth()+1);C=C.replace(/%yy/g,z(B.getYear()-100,2));C=C.replace(/%y/g,B.getFullYear());C=C.replace(/%nn/g,z(B.getMinutes(),2));C=C.replace(/%n/g,B.getMinutes());C=C.replace(/%hh/g,z(B.getHours(),2));C=C.replace(/%h/g,B.getHours());C=C.replace(/%T/g,a(A));C=C.replace(/%DD/g,z(A.getDate(),2));C=C.replace(/%D/g,A.getDate());C=C.replace(/%MM/g,z(A.getMonth()+1,2));C=C.replace(/%M/g,A.getMonth()+1);C=C.replace(/%YY/g,z(A.getYear()-100,2));C=C.replace(/%Y/g,A.getFullYear());C=C.replace(/%NN/g,z(A.getMinutes(),2));C=C.replace(/%N/g,A.getMinutes());C=C.replace(/%HH/g,z(A.getHours(),2));C=C.replace(/%H/g,A.getHours());return C}};function b(){var A=window.console;if(A&&A.error){A.error.apply(A,[].slice.call(arguments))}}function k(A,C){if(g.env.ie){return r(A,C)}try{return A.document.$.execCommand(C,false,null)}catch(B){return false}}function r(C,F){var D=C.document,A=D.getBody(),B=false,E,G=function(){B=true};A.on(F,G);E=(g.env.version>7?D.$:D.$.selection.createRange())["execCommand"](F,false);A.removeListener(F,G);return E||B}})(window.CKEDITOR);
/* Copyright (C) 2015 LoopIndex - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the LoopIndex Comments CKEditor plugin license.
 *
 * You should have received a copy of the LoopIndex Comments CKEditor plugin license with
 * this file. If not, please write to: loopindex@gmail.com, or visit http://www.loopindex.com
 * written by (David *)Frenkiel (https://github.com/imdfl) 
 */