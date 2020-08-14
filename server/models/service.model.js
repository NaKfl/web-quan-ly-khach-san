const db = require('../database');

module.exports = {
  getList: async () => {
    const rows = await db.load(`select * from Service`);
    if (rows.length === 0) return null;
    return rows;
  },

  addServiceReceipt: async () => {
    await db.load(
      `INSERT INTO servicereceipt (idService,amount,total)
      VALUES (NULL,NULL,'0')`
    );
  },

  getNewServiceReceipt: async () => {
    const rows = await db.load(`select id from servicereceipt`);
    if (rows.length === 0) return null;
    return rows[rows.length - 1];
  },

  getServiceByRentReceiptId: async (rentReceiptId) => {
    const rows = await db.load(`select s.name, amount,s.price from RentReceipt rr, RentReceiptDetail rrd, ServiceReceipt sr, Service s, ServiceType st
    where rr.id=rrd.idRentReceipt and rrd.idServiceReceipt=sr.id and sr.idService=s.id and s.idType =st.id and rr.id = ${rentReceiptId}`);
    if (rows.length === 0) return null;
    return rows;
  },

  getPriceByServiceId: async (serviceId) => {
    const rows = await db.load(`select * from Service s, ServiceType st
    where s.idType=st.id and s.id=${serviceId}`);
    if (rows.length === 0) return null;
    return rows[0];
  },

  addNewService: async (service) => {
    await db.load(`INSERT INTO ServiceReceipt (idService, amount, total)
    VALUES (${service.idService}, ${service.amount}, ${service.total})`);
  },

  getTotalCharges: async (rentReceiptId) => {
    const rows = await db.load(`select SUM(total) as total from RentReceipt rr, RentReceiptDetail rrd, ServiceReceipt sr
    where rr.id=rrd.idRentReceipt and rrd.idServiceReceipt=sr.id  and rr.id = ${rentReceiptId}`);
    if (rows.length === 0) return null;
    return rows[0];
  },
};
