import { action, computed, configure, makeObservable, observable } from 'mobx';
configure({ isolateGlobalState: true });

export class CommonStore {
  loadingStack: boolean[] = [];
  appTheme = {
    name: 'default',
    solidColor: '#F26524',
    solidLightColor: '#ecf9f6',
    gradientColor: 'linear-gradient(167.51deg, #f26524 24.37%, #f26524 78.07%)',
    shadowColor: '0 2px 10px rgba(46,207,148,0.6)',
  };
  constructor() {
    makeObservable(this, {
      loadingStack: observable,
      appTheme: observable,
      isLoading: computed,
      setLoading: action,
    });
  }

  get isLoading() {
    return this.loadingStack.length;
  }

  setLoading = (state: boolean) => {
    if (state) {
      this.loadingStack.push(state);
    } else {
      this.loadingStack.pop();
    }
  };
}

export default new CommonStore();
