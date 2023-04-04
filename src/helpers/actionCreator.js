const  {bindActionCreators} = require('@reduxjs/toolkit');
const { useMemo } = require('react');
const {useDispatch} = require('react-redux');

export const useActionCreator = (action) => {
    const dispatch = useDispatch();
    return useMemo(()=>{
        return bindActionCreators(action, dispatch )
    },[action, dispatch]);
}