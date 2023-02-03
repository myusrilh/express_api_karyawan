const sql = require("../config/db.js");

// constructor
const Karyawan = (karyawan) => {
    this.rm_mst_gepd = karyawan.rm_mst_gepd;
    this.nama_gepd = karyawan.NamaGEPD;
    this.rm_mst_epd = karyawan.rm_mst_epd;
    this.nama_epd = karyawan.NamaEPD;
    this.rm_branch_id = karyawan.rm_branch_id;
    this.rm_name = karyawan.rm_name;
};

Karyawan.insertNewKaryawan = async (request, result, next) => {
    try {
        await sql.query(`INSERT INTO karyawan(rm_branch_id, rm_rep_id, rm_name, rm_current_position, rm_manager_id) VALUES ('${request.body.rmBranchID}','${request.body.rmRepID}','${request.body.rmName}','${request.body.rmCurrentPosition}','${request.body.rmManagerID}')`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                return result.status(400).send({ error: err, data: null, message: "Error inserting data" });
            }

            // console.log(request.body);
            return result.status(200).send({ id: res.insertId, data: res, message: `Data karyawan has been inserted.` });

        });


    } catch (error) {
        next(error);
    }

};

Karyawan.getAllKaryawan = async (request, result, next) => {
    try {
        await sql.query("SELECT atasan_a.rm_rep_id as rm_mst_gepd, atasan_a.rm_name as NamaGEPD, atasan_b.rm_rep_id as rm_mst_epd, atasan_b.rm_name as NamaEPD, member.rm_branch_id, member.rm_name, member.rm_rep_id FROM karyawan as member LEFT JOIN (SELECT * FROM karyawan as atasan WHERE atasan.rm_current_position = 'EPD' OR atasan.rm_current_position = 'GEPD') as atasan_b ON member.rm_manager_id = atasan_b.rm_rep_id RIGHT JOIN (SELECT * FROM karyawan as atasan WHERE atasan.rm_current_position = 'GEPD' ) as atasan_a ON atasan_b.rm_manager_id = atasan_a.rm_rep_id WHERE member.rm_current_position = 'EPC';", (err, res) => {
            if (err) {
                console.log("error: ", err);
                return result.status(400).send({ error: err, data: null, message: "Error getting data" });
            }

            if (res.length) {
                console.log("found karyawan: ", res);
                return result.send({ error: false, data: res, message: 'List all joined member and atasan' });
            }

        });

    } catch (error) {
        next(error);
    }

};

Karyawan.getKaryawanByRepID = async (request, result, next) => {
    try {
        await sql.query("SELECT atasan_a.rm_rep_id as rm_mst_gepd, atasan_a.rm_name as NamaGEPD, atasan_b.rm_rep_id as rm_mst_epd, atasan_b.rm_name as NamaEPD, member.rm_branch_id, member.rm_name, member.rm_rep_id FROM karyawan as member LEFT JOIN (SELECT * FROM karyawan as atasan WHERE atasan.rm_current_position = 'EPD' OR atasan.rm_current_position = 'GEPD') as atasan_b ON member.rm_manager_id = atasan_b.rm_rep_id RIGHT JOIN (SELECT * FROM karyawan as atasan WHERE atasan.rm_current_position = 'GEPD' ) as atasan_a ON atasan_b.rm_manager_id = atasan_a.rm_rep_id WHERE member.rm_current_position = 'EPC' AND member.rm_rep_id = ? ",
            [request.body.repID], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result.status(400).send({ error: err, data: null, message: "Error getting data" });
                }

                var message;
                var status = 200;
                if (res.length) {
                    message = 'List joined by member and atasan by manager ID';
                } else {
                    // status = 204;
                    message = 'No data';
                    res = {
                        rm_mst_gepd: "Tidak ada data",
                        NamaGEPD: "",
                        rm_mst_epd: "",
                        NamaEPD: "",
                        rm_branch_id: "",
                        rm_name: "",
                        rm_rep_id: ""
                    };
                }
                console.log("found karyawan: ", res);
                return result.status(status).send({ error: false, data: res, message: message });

            });
    } catch (error) {
        next(error);
    }
};

Karyawan.getKaryawanByManagerID = async (request, result, next) => {
    try {
        await sql.query("SELECT atasan_a.rm_rep_id as rm_mst_gepd, atasan_a.rm_name as NamaGEPD, atasan_b.rm_rep_id as rm_mst_epd, atasan_b.rm_name as NamaEPD, member.rm_branch_id, member.rm_name, member.rm_rep_id FROM karyawan as member LEFT JOIN (SELECT * FROM karyawan as atasan WHERE atasan.rm_current_position = 'EPD' OR atasan.rm_current_position = 'GEPD') as atasan_b ON member.rm_manager_id = atasan_b.rm_rep_id RIGHT JOIN (SELECT * FROM karyawan as atasan WHERE atasan.rm_current_position = 'GEPD' ) as atasan_a ON atasan_b.rm_manager_id = atasan_a.rm_rep_id WHERE member.rm_current_position = 'EPC' AND member.rm_manager_id = ? ",
            [request.body.managerID], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result.status(400).send({ error: err, data: null, message: "Error getting data" });
                }

                var message;
                var status = 200;
                if (res.length) {
                    message = 'List joined by member and atasan by manager ID';
                } else {
                    // status = 204;
                    message = 'No data';
                    res = {
                        rm_mst_gepd: "Tidak ada data",
                        NamaGEPD: "",
                        rm_mst_epd: "",
                        NamaEPD: "",
                        rm_branch_id: "",
                        rm_name: "",
                        rm_rep_id: ""
                    };
                }
                console.log("found karyawan: ", res);
                return result.status(status).send({ error: false, data: res, message: message });

            });
    } catch (error) {
        next(error);
    }
};

Karyawan.updateKaryawan = async (request, result, next) => {
    try {
        await sql.query("UPDATE karyawan SET rm_branch_id = ?, rm_name = ?,  rm_current_position = ?, rm_manager_id = ? WHERE rm_rep_id = ?;",
            [request.body.rmBranchID, request.body.rmName, request.body.rmCurrentPosition, request.body.rmManagerID, request.body.rmRepID], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result.status(400).send({ error: err, data: null, message: "Error updating data" });
                }

                if (res.length) {
                    console.log("found karyawan: ", res);
                    return result.status(200).send({ error: false, data: res, message: `Data karyawan with ID ${request.body.rmRepID} has been updated.` });
                }

            });
    } catch (error) {
        next(error);
    }

};

Karyawan.getAllManager = async (request, result, next) => {
    try {
        await sql.query("SELECT * FROM karyawan WHERE rm_current_position='EPD' OR rm_current_position='GEPD';", (err, res) => {
            if (err) {
                console.log("error: ", err);
                return result.status(400).send({ error: err, data: null, message: "Error getting data" });
            }

            if (res.length) {
                console.log("found manager: ", res);
                return result.send({ error: false, data: res, message: 'List all manager' });
            }

        });

    } catch (error) {
        next(error);
    }
}

Karyawan.deleteKaryawan = async (request, result, next) => {
    try {
        await sql.query(`DELETE FROM karyawan WHERE rm_rep_id = '${request.params.rep_id}';`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result.status(400).send({ error: err, data: null, message: "Error deleting data" });
                }

                console.log("deleted karyawan: ", res);
                return result.status(200).send({ error: false, message: `Data karyawan with ID ${request.params.rep_id} has been deleted.` });

            });
    } catch (error) {
        next(error);
    }

}

module.exports = Karyawan;