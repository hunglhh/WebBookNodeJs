module.exports  = {
    mutipleMongooseToObject: function(mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};
//Phương thức mutipleMongooseToObject nhận một mảng các đối tượng Mongoose làm đầu vào và trả về một mảng các đối tượng JavaScript thuần túy. Nó sử dụng phương thức map để lặp qua từng đối tượng Mongoose trong mảng và gọi phương thức toObject trên mỗi đối tượng đó để chuyển đổi nó thành một đối tượng JavaScript thuần túy.

//Phương thức mongooseToObject nhận một đối tượng Mongoose làm đầu vào và trả về một đối tượng JavaScript thuần túy tương ứng. Nó kiểm tra xem đối tượng Mongoose đã được xác định hay chưa và sử dụng phương thức toObject để chuyển đổi nó thành một đối tượng JavaScript thuần túy nếu đối tượng đã được xác định. Nếu đối tượng Mongoose không được xác định, phương thức này sẽ trả về đối tượng đó mà không thay đổi.



