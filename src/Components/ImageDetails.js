// const ImageDetails = () => {
//     return(
//         <div>
//              {(close) => (
//               <div className="modal">
//                 <div className="content">Welcome to GFG!!!</div>
//                 <div >
//                   <button onClick={() => close()}>Close modal</button>
//                 </div>
//               </div>
//             )}
//         </div>
//     )
// };
// export default ImageDetails;

import React from 'react'

function ImageDetails() {
  return (
    <div>
        {(close) => (
              <div className="modal">
                <div className="content">Welcome to GFG!!!</div>
                <div >
                  <button onClick={() => close()}>Close modal</button>
                </div>
              </div>
            )}
    </div>
  )
}

export default ImageDetails