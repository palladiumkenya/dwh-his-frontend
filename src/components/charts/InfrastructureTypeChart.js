import React, { Component, useEffect, useState } from "react";
import { Button, Spinner } from "reactstrap";
import {FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { API_URL, EMAIL_URL, BASE_URL } from "../../constants";

import axios from "axios";
import { useParams } from 'react-router-dom'


ChartJS.register(ArcElement, Tooltip, Legend);


const InfrastructureTypeChart = () => {
    // State to hold the fetched data
    const [chartData, setChartData] = useState(null);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Facilities Distributed by Infrastructure Type',
            },
        },
    };

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const response = await fetch(API_URL + '/fetchInfrastructureTypesCount');
            const data = await response.json();

            // Process the data as needed
            // For example, extract labels and data for the chart
            const labels = Object.keys(data[0]);
            const values = Object.values(data[0]);

            // Update the state with the chart data
            setChartData({
                labels: Object.keys(data[0]),
                datasets: [
                    {
                        label: 'No. of Facilities',
                        data: Object.values(data[0]),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // useEffect to fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Render the chart
    return (
        <div>
            {chartData && <Pie data={chartData}  options={options}/>}
        </div>
    );

}

export default InfrastructureTypeChart;
