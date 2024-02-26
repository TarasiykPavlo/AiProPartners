import React, { useState } from "react";
import copy from "copy-to-clipboard";
import "./SubaccountTable.scss";
import editIcon from "../../../assets/images/Icons aipro partners/edit.svg";
import deleteIcon from "../../../assets/images/Icons aipro partners/delete.svg";
import Modal from "../SubaccountModal/SubaccountModal";

const SubaccountTable = () => {
    // variable that hold all rows
    const [rows, setRows] = useState([]);
    //Holds account name
    const [accountName, setAccountName] = useState("");
    // Holds row key
    const [selectedRow, setSelectedRow] = useState(null);
    //holds state of modal window false = invisible
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State for delete confirmation modal

    const [isModalVisible, setIsModalVisible] = useState(false);
    // function that puts new Account name to accountName
    const handleNewSubaccount = e => {
        setAccountName(e.target.value);
    };

    //function that puts ref to the ref state
    const handleRef = row => {
        const refToCopy = row.ref;
        copy(refToCopy);
    };

    //adding new row to the table
    const addRow = () => {
        if (accountName.length !== 0) {
            const newRow = {
                id: rows.length + 1,
                className: "border-2 border-gray p-1",
                accountName: accountName,
                ref: "REF PLACEHOLDER",
            };
            setRows([...rows, newRow]);
            setAccountName("");
            // setRef("");
        }
    };
    const handleDelete = () => {
        if (selectedRow && selectedRow.id) {
            const updatedRows = rows.filter(row => row.id !== selectedRow.id);
            setRows(updatedRows);
            setDeleteModalVisible(false); // Close delete confirmation modal after deletion
        }
    };
    const openDeleteModal = row => {
        setSelectedRow(row);
        setDeleteModalVisible(true);
    };

    const hideDeleteModal = () => {
        setDeleteModalVisible(false); // Hide delete confirmation modal
    };

    const handleEdit = row => {
        setSelectedRow(row); // Set the selected row for editing
        setAccountName(row.accountName);

        // Set the accountName state with the current account name
        setIsModalVisible(true); // Show the edit modal
    };
    const handleFormSubmit = () => {
        const updatedRow = rows.map(row => (row.id === selectedRow.id ? { ...row, accountName: accountName } : row));
        setRows(updatedRow);
        setIsModalVisible(false); // Hide the modal
        setAccountName("");
    };

    return (
        <div className={"flex w-11/12 py-16 justify-items-center "}>
            {/* Edit Modal */}
            <Modal
                title="Редактировать"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <input
                    name="accountName"
                    type="text"
                    onChange={handleNewSubaccount}
                    className="w-full h-full text-black px-2 rounded-md my-3"
                    value={accountName}
                />
                <button
                    className="custom-button"
                    onClick={handleFormSubmit}
                >
                    Сохранить
                </button>
            </Modal>
            {/* Delete Confirmation Modal */}
            <Modal
                title="Удалить?"
                open={deleteModalVisible}
                onCancel={hideDeleteModal}
                footer={null}
            >
                <div className="p-2 ">
                    <button
                        className="custom-button mx-4"
                        onClick={() => handleDelete(selectedRow.id)}
                    >
                        ДА
                    </button>
                    <button
                        className="custom-button mx-4"
                        onClick={hideDeleteModal}
                    >
                        Нет
                    </button>
                </div>
            </Modal>
            <div className="flex w-11/12 py-16 justify-items-center">
                <div className="flex flex-col  w-full content-end">
                    <div className="flex justify-end my-3   ">
                        <input
                            type="text"
                            onChange={handleNewSubaccount}
                            placeholder="Назовите Субаккаунт"
                            className="w-full text-text2  text-black px-4 rounded-md "
                            value={accountName}
                        />
                        <div className="px-3 flex justify-center">
                            <button
                                className="custom-button text-nowrap"
                                onClick={addRow}
                            >
                                Создать Субаккаунт
                            </button>
                        </div>
                    </div>
                    <table className=" bg-black">
                        <thead>
                            <tr>
                                <th className="w-2/5 bg-gradient-to-r from-gray to-white-200 ... border-gray border-2 p-1">
                                    Название Субаккаунта
                                </th>
                                <th className="2-2/5 bg-gradient-to-r from-gray to-white-200 ... ">Ссылка</th>
                                <td className="w-1/5 text-center">Управление</td>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(row => (
                                <tr
                                    key={row.id}
                                    className={row.className}
                                >
                                    <td className={row.className}>{row.accountName}</td>
                                    <td>{row.ref}</td>
                                    <td className="flex justify-end p-1">
                                        <img
                                            className="cursor-pointer mx-2"
                                            src={editIcon}
                                            alt="edit"
                                            onClick={() => handleEdit(row)}
                                        ></img>
                                        <img
                                            className="cursor-pointer mx-2"
                                            src={deleteIcon}
                                            alt="delete"
                                            onClick={() => openDeleteModal(row)}
                                        ></img>
                                        <span
                                            className="cursor-pointer mx-2"
                                            onClick={() => handleRef(row)}
                                            alt="Copy"
                                        >
                                            copy
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubaccountTable;
