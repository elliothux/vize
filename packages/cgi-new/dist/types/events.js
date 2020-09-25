"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTargetType = exports.PluginUniversalEventTrigger = exports.ComponentUniversalEventTriggers = exports.EVENT_TRIGGER_PREFIX = exports.EventTriggerType = void 0;
var EventTriggerType;
(function (EventTriggerType) {
    EventTriggerType["ComponentUniversalTrigger"] = "component_universal_trigger";
    EventTriggerType["PluginUniversalTrigger"] = "plugin_universal_trigger";
    EventTriggerType["Custom"] = "custom";
})(EventTriggerType = exports.EventTriggerType || (exports.EventTriggerType = {}));
exports.EVENT_TRIGGER_PREFIX = '__vize_event_trigger_';
var ComponentUniversalEventTriggers;
(function (ComponentUniversalEventTriggers) {
    ComponentUniversalEventTriggers["CLICK"] = "__vize_component_event_trigger_click";
    ComponentUniversalEventTriggers["DOUBLE_CLICK"] = "__vize_component_event_trigger_double_click";
    ComponentUniversalEventTriggers["LONG_PRESS"] = "__vize_component_event_trigger_long_press";
    ComponentUniversalEventTriggers["ENTER_VIEW"] = "__vize_component_event_trigger_enter_view";
    ComponentUniversalEventTriggers["LEAVE_VIEW"] = "__vize_component_event_trigger_leave_view";
    ComponentUniversalEventTriggers["INIT"] = "__vize_component_event_trigger_init";
    ComponentUniversalEventTriggers["MOUSE_ENTER"] = "__vize_component_event_trigger_mouseEnter";
    ComponentUniversalEventTriggers["MOUSE_LEAVE"] = "__vize_component_event_trigger_mouseLeave";
})(ComponentUniversalEventTriggers = exports.ComponentUniversalEventTriggers || (exports.ComponentUniversalEventTriggers = {}));
var PluginUniversalEventTrigger;
(function (PluginUniversalEventTrigger) {
    PluginUniversalEventTrigger["BEFORE_EXEC"] = "__vize_plugin_event_trigger_before_exec";
    PluginUniversalEventTrigger["AFTER_EXEC"] = "__vize_plugin_event_trigger_after_exec";
})(PluginUniversalEventTrigger = exports.PluginUniversalEventTrigger || (exports.PluginUniversalEventTrigger = {}));
var EventTargetType;
(function (EventTargetType) {
    EventTargetType["ACTION"] = "action";
    EventTargetType["COMPONENT"] = "component";
    EventTargetType["PLUGIN"] = "plugin";
})(EventTargetType = exports.EventTargetType || (exports.EventTargetType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHlwZXMvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQXNCQSxJQUFZLGdCQUlYO0FBSkQsV0FBWSxnQkFBZ0I7SUFDMUIsNkVBQXlELENBQUE7SUFDekQsdUVBQW1ELENBQUE7SUFDbkQscUNBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUpXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBSTNCO0FBSVksUUFBQSxvQkFBb0IsR0FBRyx1QkFBdUIsQ0FBQztBQUU1RCxJQUFZLCtCQVNYO0FBVEQsV0FBWSwrQkFBK0I7SUFDekMsaUZBQThDLENBQUE7SUFDOUMsK0ZBQTRELENBQUE7SUFDNUQsMkZBQXdELENBQUE7SUFDeEQsMkZBQXdELENBQUE7SUFDeEQsMkZBQXdELENBQUE7SUFDeEQsK0VBQTRDLENBQUE7SUFDNUMsNEZBQXlELENBQUE7SUFDekQsNEZBQXlELENBQUE7QUFDM0QsQ0FBQyxFQVRXLCtCQUErQixHQUEvQix1Q0FBK0IsS0FBL0IsdUNBQStCLFFBUzFDO0FBRUQsSUFBWSwyQkFHWDtBQUhELFdBQVksMkJBQTJCO0lBQ3JDLHNGQUF1RCxDQUFBO0lBQ3ZELG9GQUFxRCxDQUFBO0FBQ3ZELENBQUMsRUFIVywyQkFBMkIsR0FBM0IsbUNBQTJCLEtBQTNCLG1DQUEyQixRQUd0QztBQU1ELElBQVksZUFJWDtBQUpELFdBQVksZUFBZTtJQUN6QixvQ0FBaUIsQ0FBQTtJQUNqQiwwQ0FBdUIsQ0FBQTtJQUN2QixvQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSlcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFJMUIifQ==