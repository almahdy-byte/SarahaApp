export const Roles = {
    admin:'admin',
    user:'user'
}

Object.freeze(Roles);

export const authorizations=(...roles) => {
return (req , res , next) => {
    const user = req.user;
    if(roles.includes(user.role)) return next();
    return next(new Error('you are not allowed to access this route'));
}
}