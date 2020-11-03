import React from 'react'

const PurchaseEntryPage = () => {
    return (
        <div>
            <br></br>
            <div className='container'>
                <div className="row">
                    <div className="col l3 m3 s12"></div>
                    <div className="col l6 m3 s12">
                        <div className="row card hoverable-p deep purple lighten-5">
                            <div className="card-content">
                                <h3> <div className="center">New Purchase</div></h3>
                                <h6><div className="center">Enter details of new purchase</div></h6>
                                <form className="row s12">
                                    <div className="col s8 offset-s1">
                                        <div className="input-field">
                                            <input type="text" required />
                                            <label>Company Name</label>
                                        </div>

                                        <div className="col s8">
                                            <div className="input-field">
                                                <input type='text' className="datepicker" required />
                                                <label>Date</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col s4 offset-s1 '>
                                        <select required>
                                            <option value="H.R.">H.R.</option>
                                            <option value="C.R.">C.R.</option>
                                            <option value="G.P.">G.P.</option>
                                        </select>
                                    </div>
                                    <div className='col s4 offset-s1'>
                                        <div className="input-field">
                                            <input type="number" required />
                                            <label>Thickness</label>
                                        </div>
                                    </div>
                                    <div className='col s4 offset-s1'>
                                        <div className="input-field">
                                            <input type="number" required />
                                            <label>Width</label>
                                        </div>
                                    </div>
                                    <div className='col s4 offset-s1'>
                                        <div className="input-field">
                                            <input type="number" required />
                                            <label>No. of pieces</label>
                                        </div>
                                    </div>
                                    <div className='col s4 offset-s1'>
                                        <div className='input-field'>
                                            <input type="number" required />
                                            <label>Weight</label>
                                        </div>
                                    </div>
                                    <div className="col s12 center">
                                        <button type="submit" className="btn  waves-effect waves-light deep-purple">Submit<i className="material-icons right">send</i></button>
                                    </div>
                                </form>
                            </div>
                        </div></div></div></div>
        </div>
    )
}
export default PurchaseEntryPage