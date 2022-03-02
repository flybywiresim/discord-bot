import { ClientEvents } from 'discord.js';

export interface EventHandlerDefinition<TArgs extends [...any]> {
    event: keyof ClientEvents,
    executor: (...things: TArgs) => void,
}
