import mongoose, { model } from 'mongoose';
import bcrypt from 'bcryptjs';

// 'email': 'test@test.com',
// 'password': '1234test'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// userSchema.pre('save', function (next: any) {
//     // let user = this;
//     // if (!user.isModified('password')) {
//     //     return next()
//     // };
//     // bcrypt.hash(user.password, 10).then((hashedPassword) => {
//     //     user.password = hashedPassword;
//     //     next();
//     // })
// }, function (err) {
//     // next(err)
// });

userSchema.methods.comparePassword = function (candidatePassword: any, next: any) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return next(err);
        next(null, isMatch)
    })
};

const User = model('User', userSchema);

export default User;