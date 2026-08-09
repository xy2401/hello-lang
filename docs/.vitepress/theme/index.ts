import DefaultTheme from 'vitepress/theme';
import DockerOutput from './components/DockerOutput.vue';
import RuntimeBanner from './components/RuntimeBanner.vue';
import CodeRunner from './components/CodeRunner.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DockerOutput', DockerOutput);
    app.component('RuntimeBanner', RuntimeBanner);
    app.component('CodeRunner', CodeRunner);
  },
};
