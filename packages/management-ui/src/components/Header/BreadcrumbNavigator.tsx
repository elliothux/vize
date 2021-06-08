import * as React from 'react';
import { Breadcrumb } from 'antd';
import { BiHomeAlt } from 'react-icons/bi';
import { useLocation, useRoute } from 'wouter';
import { RouterPaths } from '../../types';

const breadcrumbNavigatorContentMap: { [path in RouterPaths]: React.ReactNode } = {
  [RouterPaths.INTRO]: null,
  [RouterPaths.PAGES]: (
    <Breadcrumb.Item>
      <span>Pages</span>
    </Breadcrumb.Item>
  ),
  [RouterPaths.TEMPLATES]: (
    <Breadcrumb.Item>
      <span>Templates</span>
    </Breadcrumb.Item>
  ),
  [RouterPaths.USER]: (
    <>
      <Breadcrumb.Item>
        <span>Manage</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>User</span>
      </Breadcrumb.Item>
    </>
  ),
  [RouterPaths.BIZ]: (
    <>
      <Breadcrumb.Item>
        <span>Manage</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>Bizs</span>
      </Breadcrumb.Item>
    </>
  ),
  [RouterPaths.MATERIALS_LIB]: (
    <>
      <Breadcrumb.Item>
        <span>Manage</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>Materials</span>
      </Breadcrumb.Item>
    </>
  ),
  [RouterPaths.LOG]: (
    <>
      <Breadcrumb.Item>
        <span>Manage</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>Logs</span>
      </Breadcrumb.Item>
    </>
  ),
  [RouterPaths.RESOURCES]: (
    <>
      <Breadcrumb.Item>
        <span>Manage</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>Resources</span>
      </Breadcrumb.Item>
    </>
  ),
  [RouterPaths.MATERIALS_DETAIL]: null,
};

export function BreadcrumbNavigator() {
  const [path, push] = useLocation();
  const [isLibDetail] = useRoute(RouterPaths.MATERIALS_DETAIL);

  let content = breadcrumbNavigatorContentMap[path as RouterPaths];
  if (!content) {
    if (isLibDetail) {
      content = (
        <>
          <Breadcrumb.Item>
            <span>Manage</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => push(RouterPaths.MATERIALS_LIB)}>
            <span>Materials</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Detail</span>
          </Breadcrumb.Item>
        </>
      );
    }
  }

  return (
    <Breadcrumb>
      <Breadcrumb.Item onClick={() => push(RouterPaths.INTRO)}>
        <BiHomeAlt />
        <span>Home</span>
      </Breadcrumb.Item>
      {content}
    </Breadcrumb>
  );
}
