const db = require('../database/');
const tableName = 'room';
module.exports = {
  find: () =>
    db.load(
      `select r.id, r.name , r.status, rt.id as idType, rt.name as typeName ,rt.price, rt.maxCustomer from Room r,RoomType rt where r.idType=rt.id`
    ),

  findById: (id) => db.findById(tableName, id),

  getRoomByCheckOutId: async (idRoom) => {
    const rows = await db.load(
      `SELECT rr.price, rt.priceHour, dateIn, dateOut FROM rentreceipt rr, rentreceiptdetail rrd, Room r, RoomType rt WHERE r.id = rrd.idRoom and rrd.idRentReceipt=rr.id and r.id=rrd.idRoom and r.idType=rt.id and r.id = ${idRoom}`
    );
    if (rows.length === 0) return null;
    return rows[rows.length - 1];
  },

  listRoom: () =>
    db.load(
      `select * from room`
    ),
    roomById: (id) =>
    db.load(
      `SELECT rt.name, rt.price FROM room as r ,roomtype as rt where r.idType = rt.id and r.id = '${id}'`
    ),
};
