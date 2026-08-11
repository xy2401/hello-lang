import DefaultTheme from 'vitepress/theme';
import DockerOutput from './components/DockerOutput.vue';
import RuntimeBanner from './components/RuntimeBanner.vue';
import CodeRunner from './components/CodeRunner.vue';
import WebLivePlayground from './components/WebLivePlayground.vue';
import VersionDiff from './components/VersionDiff.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DockerOutput', DockerOutput);
    app.component('RuntimeBanner', RuntimeBanner);
    app.component('CodeRunner', CodeRunner);
    app.component('WebLivePlayground', WebLivePlayground);
    app.component('VersionDiff', VersionDiff);
  },
};
