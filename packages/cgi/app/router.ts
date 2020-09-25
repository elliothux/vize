import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/cgi/page', controller.page.queryPage);
  router.post('/cgi/page', controller.page.createPage);
};
