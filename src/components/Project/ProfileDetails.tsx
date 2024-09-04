import { useEffect, useState, Fragment } from 'react';
import { postCall } from '../../api/apiService';
import { MODULE_ALL, SINGLE_USER_INFO } from '../../api/apiPath';
import { Link } from 'react-router-dom';
import Svgsearchiconcomponent from '../Icons/Svgsearchiconcomponent';

interface Module {
    name: string;
    permissions: { name: string }[];
}

interface UserData {
    name: string;
    email: string;
    phone: string;
    userId: number;
    roles: { role_name: string }[];
    permissions: string[];
}

interface ProfileDetailsProps {
    userId: number;
    token: string;
}

interface FormInitial {
    search: string;
    name: string;
    modules: Module[];
    id: number | null;
}

function ProfileDetails({ userId, token }: ProfileDetailsProps) {
    const formInitial: FormInitial = {
        search: '',
        name: '',
        modules: [],
        id: null
    };

    const [formData, setFormData] = useState<FormInitial>(formInitial);
    const [userData, setUserData] = useState<UserData | undefined>();
    const [modulesData, setModulesData] = useState<Module[]>([]);

    useEffect(() => {
        if (userId && userId > 0) {
            getUser();
            getAllModules();
        }
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const getUser = async () => {
        const response = await postCall(SINGLE_USER_INFO, { id: userId }, token);
        if (response?.code === 200) {
            const userData = response?.data as UserData;
            setUserData(userData);
            setFormData({ ...formInitial, name: userData?.name, id: userData?.userId });
        }
    };

    const getAllModules = async () => {
        const response = await postCall(MODULE_ALL, null, token);
        if (response?.code === 200) {
            const moduleList = response?.data?.modulelist as Module[];
            setModulesData(moduleList);
            setFormData({ ...formInitial, modules: moduleList });
        } else {
            setFormData({ ...formInitial, modules: [] });
        }
    };

    return (
        <Fragment>
            <div className="card-body p-0">
                {/* User Details */}
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bold text-muted">Full Name</label>
                    <div className="col-lg-8">
                        <span className="fw-bolder fs-6 text-gray-800">{userData?.name}</span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bold text-muted">Email</label>
                    <div className="col-lg-8">
                        <span className="fw-bolder fs-6 text-gray-800">{userData?.email}</span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bold text-muted">Phone</label>
                    <div className="col-lg-8">
                        <span className="fw-bolder fs-6 text-gray-800">{userData?.phone}</span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bold text-muted">Role</label>
                    <div className="col-lg-8">
                        {userData?.roles.map((role, index) => (
                            <span key={`role-${index}`} className="badge rounded-pill font-size-12 fw-medium mx-1 bg-light">
                                {role.role_name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Permissions Search */}
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bold text-muted">Permissions</label>
                    <div className="col-lg-4">
                        <span className="fw-bolder fs-6 text-gray-800">
                            <div className="col-md-4 input-group mb-3 w-lg-400px">
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    onChange={handleChange}
                                    onKeyUp={handleChange}
                                    value={formData.search}
                                    placeholder="Search Permission"
                                    className="form-control form-control-sm form-control-solid h-40px bg-body fs-7"
                                    autoComplete="off"
                                />
                                <div className="input-group-append">
                                    <Link to="#" onClick={(e) => e.preventDefault()} className="input-group btn btn-primary" style={{ borderRadius: '0', padding: '9px' }}>
                                        <Svgsearchiconcomponent />
                                    </Link>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>

                {/* Modules and Permissions */}
                <div className="row pt-4">
                    {modulesData.length > 0 && modulesData.map((module, i) => {
                        const filteredPermissions = module.permissions.filter(itm =>
                            userData?.permissions.includes(itm.name)
                        );
                        return filteredPermissions.length ? (
                            <div className="col-lg-4 my-0" key={`profiledetail-module-${i}`}>
                                <div className="card card-stretch card-bordered mb-3">
                                    <div className="card-header py-2">
                                        <h3 className="card-title my-0">{module.name}</h3>
                                    </div>
                                    <div className="card-body py-2">
                                        {filteredPermissions.map((permission, j) => {
                                            return formData.search ? (
                                                permission.name.toLowerCase().includes(formData.search.toLowerCase()) && (
                                                    <div className="d-flex flex-column" key={`profiledetail-permission-${j}`}>
                                                        <li className="d-flex align-items-center py-0">
                                                            <span className="bullet bullet-dot bg-danger me-5"></span>
                                                            {permission.name}
                                                        </li>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="d-flex flex-column" key={`profiledetail-permission-${j}`}>
                                                    <li className="d-flex align-items-center py-0">
                                                        <i className="mdi mdi-circle-medium me-1 text-success align-middle"></i>
                                                        {permission.name}
                                                    </li>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : null;
                    })}
                </div>
            </div>
        </Fragment>
    );
}

export default ProfileDetails;
