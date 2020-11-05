import './index.scss';
import { Router } from './Router';

export default function({ render, implementRouterController }: any) {
  // DO something before render
  // implementRouterController(Router);
  render();
}
