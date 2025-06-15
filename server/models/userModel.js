import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true
    },
    isDoctor:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    unseenNotifications:{
        type:Array,
        default:[]
    },
    seenNotifications:{
        type:Array,
        default:[]
    },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model('user', userSchema);

export default userModel;