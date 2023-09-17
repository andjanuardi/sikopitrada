import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);
import { faker } from "@faker-js/faker";
export default function Beranda() {
  const session = useSession();
  const [stat, setStat] = useState([]);
  const { data: statData, getData: getStat } = useFetch(
    `/api/stat?ta=${session.data.ta}`,
    "GET"
  );

  useEffect(() => {
    getStat();
  }, []);
  useEffect(() => {
    setStat({ stat: statData.stat && statData.stat[0], sdana: statData.sdana });
  }, [statData]);

  const colorSdana = stat.sdana && stat.sdana.map((e) => faker.color.rgb());

  const pieDataSdana = {
    optionsPie: {
      responsive: true,
      // maintainAspectRatio: true,
      // aspectRatio: 1 | 2,

      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed !== null) {
                label +=
                  "Rp. " +
                  new Intl.NumberFormat("id-ID").format(context.parsed);
              }
              return label;
            },
          },
        },
      },
    },
    dataPie: {
      labels: stat.sdana && stat.sdana.map((e) => e.nama_sdana),
      datasets: [
        {
          label: "Pagu",
          data: stat.sdana && stat.sdana.map((e) => e.nilai),
          backgroundColor: colorSdana,
        },
      ],
    },
  };

  const barDataRealisasi = {
    optionsBar: {
      responsive: true,
      maintainAspectRatio: true,
      // aspectRatio: 1 | 1,

      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
        },
        // tooltip: {
        //   callbacks: {
        //     label: function (context) {
        //       let label = context.dataset.label || "";
        //       if (label) {
        //         label += ": ";
        //       }
        //       if (context.parsed !== null) {
        //         label +=
        //           "Rp. " +
        //           new Intl.NumberFormat("id-ID").format(context.parsed);
        //       }
        //       return label;
        //     },
        //   },
        // },
      },
    },
    dataBar: {
      labels: stat.sdana && stat.sdana.map((e) => e.nama_sdana),
      datasets: [
        {
          label: "Pagu",
          data: stat.sdana && stat.sdana.map((e) => e.nilai),
          backgroundColor: faker.color.rgb(),
        },
        {
          label: "Total Realisasi",
          data:
            stat.sdana &&
            stat.sdana.map(
              (e) =>
                stat.stat &&
                stat.stat.reduce(
                  (a, b) => b.nama_sdana === e.nama_sdana && a + b.nilaitotal,
                  0
                )
            ),
          backgroundColor: faker.color.rgb(),
        },
        {
          label: "Realisasi Tahap 1",
          data:
            stat.sdana &&
            stat.sdana.map(
              (e) =>
                stat.stat &&
                stat.stat.reduce(
                  (a, b) => b.nama_sdana === e.nama_sdana && a + b.nilai1,
                  0
                )
            ),
          backgroundColor: faker.color.rgb(),
        },
        {
          label: "Realisasi Tahap 2",
          data:
            stat.sdana &&
            stat.sdana.map(
              (e) =>
                stat.stat &&
                stat.stat.reduce(
                  (a, b) => b.nama_sdana === e.nama_sdana && a + b.nilai2,
                  0
                )
            ),
          backgroundColor: faker.color.rgb(),
        },
        {
          label: "Realisasi Tahap 3",
          data:
            stat.sdana &&
            stat.sdana.map(
              (e) =>
                stat.stat &&
                stat.stat.reduce(
                  (a, b) => b.nama_sdana === e.nama_sdana && a + b.nilai3,
                  0
                )
            ),
          backgroundColor: faker.color.rgb(),
        },
        {
          label: "Realisasi Tahap 4",
          data:
            stat.sdana &&
            stat.sdana.map(
              (e) =>
                stat.stat &&
                stat.stat.reduce(
                  (a, b) => b.nama_sdana === e.nama_sdana && a + b.nilai4,
                  0
                )
            ),
          backgroundColor: faker.color.rgb(),
        },
        {
          label: "Sisa Pagu",
          data:
            stat.sdana &&
            stat.sdana.map(
              (e) =>
                stat.stat &&
                stat.stat.reduce(
                  (a, b) => b.nama_sdana === e.nama_sdana && a + b.sisa,
                  0
                )
            ),
          backgroundColor: faker.color.rgb(),
        },
      ],
    },
  };

  return (
    <div className="p-5 grid gap-3 bg-slate-50 rounded-lg">
      <div className=" flex items-center gap-2 font-black text-lg">
        <FaChartBar /> Statistik Data Dana Transfer
      </div>
      <div className="stats flex flex-col lg:flex-row shadow">
        {stat.sdana &&
          stat.sdana.map((d, k) => (
            <div key={k} className="stat">
              <div
                className="stat-figure font-black text-lg "
                style={{ color: colorSdana[k] }}
              >
                {new Intl.NumberFormat("id-ID").format(
                  stat.stat &&
                    (stat.stat.reduce(
                      (a, b) =>
                        b.nama_sdana === d.nama_sdana && a + b.nilaitotal,
                      0
                    ) /
                      d.nilai) *
                      100
                )}{" "}
                %
              </div>
              <div className="stat-title font-black">
                Total Realisasi {d.nama_sdana}
              </div>
              <div className={`stat-value`} style={{ color: colorSdana[k] }}>
                Rp.{""}
                {new Intl.NumberFormat("id-ID").format(
                  stat.stat &&
                    stat.stat.reduce(
                      (a, b) =>
                        b.nama_sdana === d.nama_sdana && a + b.nilaitotal,
                      0
                    )
                )}
              </div>
              <div className="stat-desc mt-2">
                Pagu : {new Intl.NumberFormat("id-ID").format(d.nilai)}
              </div>
            </div>
          ))}
      </div>

      <div className="stats flex flex-col lg:flex-row shadow">
        <div className="stat flex-1 flex items-center flex-col">
          <div className="font-bold stat-title">Grafik Pagu Sumber Dana</div>
          <div className="h-[40vh]">
            <Pie
              data={pieDataSdana.dataPie}
              options={pieDataSdana.optionsPie}
            />
          </div>
        </div>

        <div className="stat flex-1 flex items-center flex-col">
          <div className="font-bold stat-title">Grafik Pagu Realisasi</div>
          <div className="h-[40vh] w-full">
            <Bar
              data={barDataRealisasi.dataBar}
              options={barDataRealisasi.optionsBar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
import useFetch from "@/hooks/useFetch";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaChartBar } from "react-icons/fa";
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
