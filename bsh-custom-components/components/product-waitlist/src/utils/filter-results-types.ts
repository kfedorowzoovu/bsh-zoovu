export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  text: string;
  parameters: {
    [key: string]: any;
    specialFilter: boolean;
  };
}

export interface SelectedAnswer extends Answer {
  select(): void;
}

export interface ZoovuAdvisorUIModel {
  getModel(): any;
}

export interface ZoovuAdvisorUIModelContext {
  getInjectable(symbol: symbol): any;
}

export interface ZoovuAdvisorUI {
  advisorUI: {
    getModel(): ZoovuAdvisorUIModel;
    modelContext: ZoovuAdvisorUIModelContext;
  };
}

export interface ZoovuAdvisor {
  [key: string]: ZoovuAdvisorUI;
}

export interface ZoovuAdvisorsWindow extends Window {
  ZoovuAdvisors?: ZoovuAdvisor;
}

export interface PreselectionValue<T = number | string | object | boolean> {
  /** The default value of the preselection. */
  defaultValue: T;
  /** The current value of the preselection. */
  value: T;
}

export interface Window {
  ZoovuAdvisors?: {
    [key: string]: {
      advisorUI: any; // Replace `any` with the actual type of `advisorUI`
    };
  };
}
declare global {
  interface Window {
    ZoovuAdvisors?: {
      [key: string]: {
        advisorUI: any; // Replace `any` with the actual type of `advisorUI`
      };
    };
  }
}
