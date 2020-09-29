import React from 'react';

function get_all_sums(arr) {
    var sum_ = 0;
    var in_ = 0;
    var out_ = 0;
    arr.forEach(item => {
        const n = parseFloat(item.amount);
        if (item.add) {
            sum_ += n;
            in_ += n;
        } else {
            sum_ -= n;
            out_ += n;
        }
    });
    return [sum_, in_, out_];
}

const Total = ({ transactions }) => {
    const sums = get_all_sums(transactions);
    const all_amount = sums[0], in_amount = sums[1], out_amount = sums[2];
    return (
        <section className="total">
            <header className="total__header">
                <h3>Баланс</h3>
                <p className="total__balance"
                >{all_amount} ₽
            </p>
            </header>
            <div className="total__main">
                <div className="total__main-item total__income">
                    <h4>Доходы</h4>
                    <p className="total__money total__money-income">
                        +{in_amount} ₽
                    </p>
                </div>
                <div className="total__main-item total__expenses">
                    <h4>Расходы</h4>
                    <p className="total__money total__money-expenses">
                        -{out_amount} ₽
                    </p>
                </div>
            </div>
        </section>
    )
};

export default Total;