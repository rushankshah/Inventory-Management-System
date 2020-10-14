import React from 'react'

const PurchaseEntryPage = () => {
    return (
        <div>
            <div className='container'>
                <div className="card-content ">
                    <h4 className="center">Enter a new purchase</h4>
                    <form className="row s12">
                        <div className="col s4">
                            <div className="input-field">
                                <input type='text' className="datepicker" required />
                                <label>Enter date</label>
                            </div>
                        </div>
                        <div className="col s8">
                            <div className="input-field">
                                <input type="text" required />
                                <label>Enter company Name</label>
                            </div>
                        </div>
                        <div className='col s3'>
                            <select required>
                                <option value="1">H.R.</option>
                                <option value="2">C.R.</option>
                                <option value="3">G.P.</option>
                            </select>
                            <label>Quality</label>
                        </div>
                        <div className='col s3'>
                            <div className="input-field">
                                <input type="number" required />
                                <label>Enter thickness</label>
                            </div>
                        </div>
                        <div className='col s3'>
                            <div className="input-field">
                                <input type="number" required />
                                <label>Enter width</label>
                            </div>
                        </div>
                        <div className='col s3'>
                            <div className="input-field">
                                <input type="number" required />
                                <label>Enter number of pieces</label>
                            </div>
                        </div>
                        <div className='col s12'>
                            <div className='input-field'>
                            <input type="number" required />
                                <label>Enter weight</label>
                            </div>
                        </div>
                        <div className="col s12 center">
                            <button type="button" className="btn btn-large waves-effect waves-light">Submit<i className="material-icons right">send</i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default PurchaseEntryPage