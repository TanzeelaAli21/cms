const prisma = require('../getPrisma');
const validateUser = require('../utils/checkAuthorization');
const ErrorResponse = require('../utils/Error');

exports.createAttendanceRecord = async (req, res, next) => {
    try {
        console.log("inside attendance", req.User);
        const { role } = req.User;
        const { classId, createdAt, attendances, date } = req.body;
        if (!validateUser.checkAdmin(role))
            next(new ErrorResponse('Unauthorized route', 401));
        // if (!validateUser.checkTeacher(role))   
        //     next(new ErrorResponse('Unauthorized route', 401));
        if (!classId || !date)
            next(new ErrorResponse('Enter correct details', 400));
        const create = await prisma.attendanceRecord.create({
            data: {
                classId: parseInt(classId),
                createdAt,
            },
        })
        if (create) {
            let result = attendances.map(obj => ({ ...obj,
                 attendanceRecordId: create.id, 
                 studentId: parseInt(obj.studentId),
                 isPresent: obj.isPresent == 'true' ? true : false
                }))
            console.log("......", result);
            const createMany = await prisma.attendance.createMany({
                data: result,
                skipDuplicates: true,
            })
            console.log("attendance records ..", createMany);
            res.status(200).json({
                success: true,
                message: "attendance marked successfully"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message | "server error"
        })
    }
}