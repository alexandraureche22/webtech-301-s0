import { useMemo } from "react";
import { Dialog } from "primereact/dialog";
import { Chart } from "primereact/chart";

function ChartsDialog({ visible, onHide, books }) {
  // exemplu: bar chart (ex: cate carti pe gen)
  const barData = useMemo(() => {
    const map = {};
    for (const b of books || []) {
      const g = b.genre || "unknown";
      map[g] = (map[g] || 0) + 1;
    }

    return {
      labels: Object.keys(map),
      datasets: [
        {
          label: "Books / genre",
          data: Object.values(map),
        },
      ],
    };
  }, [books]);

  // ✅ Pie chart (ex: cate carti pe gen)
  const pieData = useMemo(() => {
    const map = {};
    for (const b of books || []) {
      const g = b.genre || "unknown";
      map[g] = (map[g] || 0) + 1;
    }

    return {
      labels: Object.keys(map),
      datasets: [
        {
          data: Object.values(map),
        },
      ],
    };
  }, [books]);

  return (
    <Dialog
      header="Charts"
      visible={visible}
      onHide={onHide}
      style={{ width: "70vw" }}
    >
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <div style={{ width: "480px" }}>
          <h4>Bar chart</h4>
          <Chart type="bar" data={barData} />
        </div>

        <div style={{ width: "480px" }}>
          <h4>Pie chart</h4>
          <Chart type="pie" data={pieData} />
        </div>
      </div>
    </Dialog>
  );
}

export default ChartsDialog;
