import React, { useEffect, useState, useRef, useCallback } from 'react';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    useEffect(() => {
        // Dummy data for testing
        const dummyReports = Array.from({ length: 100 }, (_, index) => ({
            _id: `${index + 1}`,
            title: `Report ${index + 1}`,
            description: `This is the description for report ${index + 1}.`,
            createdAt: new Date().toISOString()
        }));

        // Simulate fetching data
        setTimeout(() => {
            setReports(prevReports => [...prevReports, ...dummyReports.slice((page - 1) * 10, page * 10)]);
            if (page * 10 >= dummyReports.length) {
                setHasMore(false);
            }
        }, 1000);
    }, [page]);

    const lastReportElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col">
            <h1 className="text-3xl font-bold mb-8 text-center">Reports</h1>
            {reports.length === 0 ? (
                <div className="flex-grow flex justify-center items-center">
                    <h2 className="text-2xl font-semibold ">No Reports Available</h2>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
                    {reports.map((report, index) => {
                        if (reports.length === index + 1) {
                            return (
                                <div ref={lastReportElementRef} key={report._id} className="card bg-base-200 shadow-md rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-2 text-primary">{report.title}</h2>
                                    <p className=" mb-4">{report.description}</p>
                                    <p className=" text-sm">Created At: {new Date(report.createdAt).toLocaleDateString()}</p>
                                </div>
                            );
                        } else {
                            return (
                                <div key={report._id} className="card bg-base-200 shadow-md rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-2 text-primary">{report.title}</h2>
                                    <p className=" mb-4">{report.description}</p>
                                    <p className=" text-sm">Created At: {new Date(report.createdAt).toLocaleDateString()}</p>
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default Reports;