/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash";

//components
import { left_menu } from "../utils/utils";
import Right from "../assets/images/angle-right.svg";

interface Menu {
  icon: string;
  name: string;
  href: string;
}

const menu: Menu[] = left_menu;

const VerticalTabs = () => {
  const RenderItem = () =>
    _.map(menu, (item) => (
      <li>
        <a
          href={item?.href}
          className="inline-flex items-center justify-between py-[8px] px-[8px] rounded-lg w-[calc(20vw)] max-w-[250px] text-[#000] hover:bg-[#f4f4f4] "
          aria-current="page"
        >
          <div className="flex flex-row items-center font-semibold">
            <img
              src={item.icon}
              className="mr-3 h-[16px] w-[16px]"
              alt="Basketball Logo"
            />
            {item?.name}
          </div>
          <img
            src={Right}
            className="mr-3 h-[16px] w-[16px]"
            alt="Basketball Logo"
          />
        </a>
      </li>
    ));

  return (
    <div className="md:flex border px-4 py-2 justify-center">
      <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        {RenderItem()}
      </ul>
    </div>
  );
};

export default VerticalTabs;
