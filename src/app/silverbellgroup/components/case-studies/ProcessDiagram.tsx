import st from './CaseStudies.module.scss';

const desktopNodesAfter = ['Execution 24/7', 'Global Output Delivery', 'Feedback Loop'];
const mobileNodesBefore = ['Human Expertise', 'AI Agent Extension'];
const mobileNodesAfter = ['Execution 24/7', 'Global Output Delivery', 'Feedback Loop'];

export const ProcessDiagram = () => {
  return (
    <div className={st.diagram}>
      <div className={st.desktopDiagram} aria-hidden="true">
        <div className={st.desktopRow}>
          <div className={st.pill}>Human Expertise</div>
          <span className={st.desktopConnector} />
          <div className={st.pill}>AI Agent Extension</div>
          <span className={st.desktopConnector} />

          <div className={st.cluster}>
            <span className={st.clusterOutline} />
            <div className={`${st.pill} ${st.clusterInput}`}>Input</div>
            <div className={`${st.pill} ${st.clusterProcess}`}>Process</div>
            <div className={`${st.pill} ${st.clusterLogic}`}>Logic</div>
          </div>

          {desktopNodesAfter.map((node) => (
            <div key={node} className={st.desktopNodeGroup}>
              <span className={st.desktopConnector} />
              <div className={st.pill}>{node}</div>
            </div>
          ))}

          <span className={st.desktopConnector} />
          <div className={`${st.pill} ${st.pillAi}`}>AI</div>
        </div>
      </div>

      <div className={st.mobileDiagram}>
        {mobileNodesBefore.map((node, index) => (
          <div key={node} className={st.mobileStep}>
            <div className={st.pill}>{node}</div>
            {index < mobileNodesBefore.length - 1 && <span className={st.mobileConnector} />}
          </div>
        ))}

        <div className={st.mobileClusterWrap}>
          <span className={st.mobileConnector} />
          <div className={st.mobileCluster}>
            <span className={st.mobileClusterOutline} />
            <div className={st.pill}>Input</div>
            <div className={st.pill}>Process</div>
            <div className={st.pill}>Logic</div>
          </div>
          <span className={st.mobileConnector} />
        </div>

        {mobileNodesAfter.map((node) => (
          <div key={node} className={st.mobileStep}>
            <div className={st.pill}>{node}</div>
            <span className={st.mobileConnector} />
          </div>
        ))}

        <div className={`${st.pill} ${st.pillAi}`}>AI</div>
      </div>
    </div>
  );
};
