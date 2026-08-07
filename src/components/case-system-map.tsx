import Link from "next/link";

import type { CaseSystemEdge, CaseSystemNode } from "@/types/project";

import styles from "./case-system-map.module.css";

type CaseSystemMapProps = {
  nodes: CaseSystemNode[];
  edges: CaseSystemEdge[];
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.arrowIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CaseSystemMap({ nodes, edges }: CaseSystemMapProps) {
  const nodesById = new Map(nodes.map((node) => [node.id, node]));

  return (
    <div className={styles.map}>
      <div className={styles.nodes} aria-label="Участники системы">
        {nodes.map((node) => {
          const nodeContent = (
            <>
              <span className={styles.nodeRole}>{node.role}</span>
              <span className={styles.nodeTitle}>{node.title}</span>
              <span className={styles.nodeDescription}>{node.description}</span>
            </>
          );

          return node.projectSlug ? (
            <Link
              key={node.id}
              href={`/projects/${node.projectSlug}`}
              className={`${styles.node} ${styles.nodeLinked}`}
            >
              {nodeContent}
            </Link>
          ) : (
            <div key={node.id} className={styles.node}>
              {nodeContent}
            </div>
          );
        })}
      </div>

      <ol className={styles.edges} aria-label="Связи между частями системы">
        {edges.map((edge) => {
          const fromNode = nodesById.get(edge.from);
          const toNode = nodesById.get(edge.to);

          if (!fromNode || !toNode) {
            return null;
          }

          return (
            <li
              key={`${edge.from}-${edge.to}-${edge.label}`}
              className={styles.edge}
            >
              <span className={styles.endpoint}>{fromNode.title}</span>
              <span className={styles.edgeAction}>
                <ArrowIcon />
                {edge.label}
              </span>
              <span className={styles.endpoint}>{toNode.title}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
