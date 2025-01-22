import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt";


const newSchema = new mongoose.Schema({
    username:{
        type:Schema.Types.Mixed,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        validate: {
            validator: function (value) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
          },
        },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    verified:{
        type:Boolean,
        default:false
    }

})
const SALT_WORK_FACTOR = 2;
newSchema.pre('save', function(next) {
    const user = this;

if (!user.isModified('password')) return next();

bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});


});

newSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default mongoose.model("User_details", newSchema);
