const mongoose  = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    organisationId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation"
    },
    name:{
        type: String, 
        required: true,
        minLength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user" 
    },

},
{
    timestamps: true
}) 

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    }
    next();
});

const User = mongoose.model("User", userSchema)

module.exports = User