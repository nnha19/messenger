import React, { useState, useEffect } from "react";

import { IGroups } from "../../../../types/types";
import axios from "axios";

import GroupList from "./GroupList/GroupList";

const Groups = () => {
  const [groups, setGroups] = useState<IGroups["groups"]>([]);

  useEffect(() => {
    (async () => {
      const resp = await axios.get("http://localhost:5000/group");
      const group = resp.data;
      setGroups(group);
    })();
  }, []);

  return (
    <div className="h-md overflow-y-auto">
      <GroupList groups={groups} />
    </div>
  );
};
export default Groups;
