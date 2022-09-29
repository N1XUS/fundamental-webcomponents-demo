import { TabItemState } from "@fundamental-ngx/core/tabs";
import { FdWebComponent } from "@fundamental-ngx/core/web-components";

interface HTMLElementFdwTabEventMap extends HTMLElementEventMap {
  opened: Event;
  closed: Event;
}

declare global {
  interface HTMLElementTagNameMap {
    'fdw-tab': FdwTab;
    'fdw-button': FdwButton;
  }
}

declare interface FdwButton extends FdWebComponent, HTMLElement {}

declare interface FdwTab extends FdWebComponent, HTMLElement {
  ariaLabel: string;
  ariaLabelledBy?: string;
  title: string;
  count?: string;
  glyph?: string;
  header: boolean;
  disabled: boolean;
  tabState?: TabItemState;

  addEventListener<K extends keyof HTMLElementFdwTabEventMap>(type: K, listener: (this: FdwTab, ev: HTMLElementFdwTabEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof HTMLElementFdwTabEventMap>(type: K, listener: (this: FdwTab, ev: HTMLElementFdwTabEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
