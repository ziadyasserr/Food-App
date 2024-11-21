// import React from 'react'

import nodata from "../../../../assets/images/nodata.png"

export default function NoData() {
  return (
    <div className="no-data text-center py-5">

      <img src={nodata} alt="NO Data" />
      <h2 className="py-2 fw-bold">No Data</h2>
      <span className="text-black-50">are you sure you want to delete this item ? if you are sure just click on delete it</span>
    </div>
  )
}
