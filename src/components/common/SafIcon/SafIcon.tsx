import React from "react";

import { SafIconProps } from "./SafIcon.types";

import ICONS from "~/assets/icons";

const SafIcon = (props: SafIconProps): JSX.Element => {
  const { name, ...restOfProps } = props;
  const IconComp = name in ICONS ? ICONS[name] : null;
  return <IconComp {...restOfProps} />;
};

export default SafIcon;
