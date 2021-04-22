import React from "react";

import { Permission } from "src/services/api/permission";
import { Permission as PermissionComponent } from "src/components/repositories/reference";

interface Props {
  permissions?: Permission[];
}

const PermissionGroup = ({ permissions }: Props) => {
  return (
    <>
      <PermissionComponent permissions={permissions} />
    </>
  );
};

export default PermissionGroup;
