import {useState} from 'react'
import type { Stage, StageGroup } from "../contracts/scenario";
import {STAGE_TREE, STAGE_GROUP_LABELS, STAGE_LABELS} from '../config/stageConfig'

type SidebarNavProps = {
  onStageClick: (stageGroup: StageGroup, stage: Stage) => void;
};


const PracticeSidebar = ({onStageClick}: SidebarNavProps) => {
  const [expandedGroups, setExpandedGroups] = useState<StageGroup[]>([]);

  function handleGroupClick(group: StageGroup) {
    setExpandedGroups((current) => {
        if (current.includes(group)) {
            return current.filter((item) => item !== group);
        }
        return [...current, group];
    });
  }

  return (
    <div>
        {STAGE_TREE.map((groupItem) => {
            const isExpanded = expandedGroups.includes(groupItem.group);
            return (
                <div key={groupItem.group}>
                    <h3 onClick={() => handleGroupClick(groupItem.group)}>{STAGE_GROUP_LABELS[groupItem.group]}</h3>
                    <ul>
                        {isExpanded && groupItem.stages.map((stage) => {
                            return (
                                <li onClick={()=>onStageClick(groupItem.group, stage)} key={stage}>{STAGE_LABELS[stage]}</li>
                            );
                        })}
                    </ul>
                </div>
            )
        })}
    </div>
  )
}

export default PracticeSidebar