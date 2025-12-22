import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

// 参考座標：https://qiita.com/butchi_y/items/3a6b70b38e13dc56ef13
// 計算サイト：https://keisan.casio.jp/exec/system/1257670779

/*
 * 駅名    緯度         経度
 * ------+-----------+------------------
 * 新宿駅 | 35.690921 | 139.70025799999996
 * 渋谷駅 | 35.658517 | 139.70133399999997
 * 池袋駅 | 35.728926 | 139.71038
 *
 * 新宿 <=> 渋谷：3.608509[km]
 * 新宿 <=> 池袋：4.328496[km]
 * 渋谷 <=> 池袋：7.880446[km]
 */

const main = async () => {
  await prisma.location.createMany({
    data: [
      {
        id: "1",
        name: "新宿駅",
        latitude: 35.690921,
        longitude: 139.70025799999996,
      },
      {
        id: "2",
        name: "渋谷駅",
        latitude: 35.658517,
        longitude: 139.70133399999997,
      },
      {
        id: "3",
        name: "池袋駅",
        latitude: 35.728926,
        longitude: 139.71038,
      },
    ],
    skipDuplicates: true,
  });

  const allLocations = await prisma.location.findMany();
  console.log("allLocations:", allLocations);

  const point = { latitude: 35.690921, longitude: 139.70025799999996 }; // 新宿駅
  const coordinateSql = newCoordinateSql(point);
  const distance = 4 * 1000; // m
  const fromShinjuku = await prisma.$queryRaw`
SELECT
  t.name,
  t.latitude,
  t.longitude,
  ST_Distance(t.point, ${coordinateSql}) AS distance
FROM locations t
WHERE ST_DWithin(t.point, ${coordinateSql}, ${distance})
ORDER BY distance ASC`;

  console.log(`Within ${distance} m from shinjuku:`, fromShinjuku);
};

type Coordinate = {
  latitude: number;
  longitude: number;
};

const newCoordinateSql = ({ latitude, longitude }: Coordinate) =>
  Prisma.sql`ST_Point(${longitude}, ${latitude}, 4326)`;

main().then(async () => {
  await prisma.$disconnect();
});
