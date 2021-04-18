import { ComponentInstanceDSL, EventInstanceDSL, EventTargetType, HotAreaDSL, PluginInstanceDSL } from '@vize/types';
import { SeedItemType, Seeds } from '../types';

export function generatePluginsSeeds(plugins: PluginInstanceDSL[], seeds: Seeds): Seeds {
  plugins.forEach(({ events, plugin, lib }) => {
    if (events?.length) {
      generateEventsSeeds(events, seeds);
    }

    if (seeds.plugins[plugin]) {
      return;
    }
    seeds.plugins[plugin] = {
      type: SeedItemType.Plugin,
      name: plugin,
      lib,
    };
  });
  return seeds;
}

export function generateComponentsSeeds(components: ComponentInstanceDSL[], seeds: Seeds): Seeds {
  components.forEach(({ children, hotAreas, events, component, lib }) => {
    if (children?.length) {
      generateComponentsSeeds(children, seeds);
    }

    if (hotAreas?.length) {
      generateHotAreasSeed(hotAreas, seeds);
    }

    if (events?.length) {
      generateEventsSeeds(events, seeds);
    }

    if (seeds.components[component]) {
      return;
    }
    seeds.components[component] = {
      type: SeedItemType.Component,
      name: component,
      lib,
    };
  });
  return seeds;
}

export function generateHotAreasSeed(hotAreas: HotAreaDSL[], seeds: Seeds): Seeds {
  hotAreas.forEach(({ events }) => {
    if (events?.length) {
      generateEventsSeeds(events, seeds);
    }
  });
  return seeds;
}

export function generateEventsSeeds(events: EventInstanceDSL[], seeds: Seeds): Seeds {
  events.forEach(({ target }) => {
    if (target.type !== EventTargetType.Action) {
      return;
    }
    const { id, lib } = target;
    if (seeds?.actions[id]) {
      return;
    }
    seeds.actions[id] = {
      type: SeedItemType.Action,
      name: id,
      lib,
    };
  });
  return seeds;
}
