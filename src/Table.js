import React from 'react'
import './Table.css';

function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country, cases}) => ( //split apart and get country and cases, Table Row, Table Data
                <tr> 
                    <td>{country}</td> 
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ))}
            
        </div>
    );
}

export default Table;
