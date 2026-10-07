export type FAQ = { question: string; answer: string };

export const toolFaqs: Record<string, FAQ[]> = {
  "amps-to-watts-calculator": [
    {
      question: "What is the formula to convert amps to watts?",
      answer: "For DC: Watts = Amps × Volts. For single-phase AC: Watts = Amps × Volts × Power Factor. For three-phase AC: Watts = √3 × Amps × Volts × Power Factor.",
    },
    {
      question: "What is power factor and why does it matter?",
      answer: "Power factor measures how efficiently electrical power is used, ranging from 0 to 1. Resistive loads like heaters have a PF of 1, while inductive loads like motors may have a PF of 0.7-0.9.",
    },
    {
      question: "Can I use this calculator for 3-phase systems?",
      answer: "Yes. Select 'Three-phase AC' from the system type dropdown. The calculator will use the line-to-line voltage and apply the √3 multiplier automatically.",
    },
  ],
  "watts-to-amps-calculator": [
    {
      question: "How do you calculate amps from watts?",
      answer: "For DC systems, divide Watts by Volts. For single-phase AC systems, divide Watts by (Volts × Power Factor). For three-phase AC, divide Watts by (√3 × Volts × Power Factor).",
    },
    {
      question: "How many amps is 1500 watts?",
      answer: "At 120 volts (standard US residential AC), 1500 watts draws 12.5 amps assuming a power factor of 1. If the appliance has a motor, the current draw may be slightly higher due to a lower power factor.",
    },
    {
      question: "Why do I need to know the voltage to convert watts to amps?",
      answer: "Watts are a measure of total power, which is the product of current (amps) and electrical pressure (volts). Without knowing the voltage, it is impossible to determine how much current is flowing.",
    },
  ],
  "volts-amps-watts-calculator": [
    {
      question: "What is Ohm's Law and the power formula?",
      answer: "Ohm's Law relates voltage, current, and resistance (V = I × R). The power formula states that Power (Watts) equals Voltage (Volts) multiplied by Current (Amps) in a DC circuit (W = V × I).",
    },
    {
      question: "What is the difference between watts and volt-amps (VA)?",
      answer: "Watts represent real, usable power, while Volt-Amps (VA) represent apparent power. In AC circuits, they differ due to the power factor. VA is calculated simply as Volts × Amps, whereas Watts equals Volts × Amps × Power Factor.",
    },
    {
      question: "Can I convert volts directly to watts?",
      answer: "No, you cannot convert volts to watts without knowing the current (amps). Volts measure electrical pressure, while watts measure total power. You need both volts and amps to calculate watts.",
    },
  ],
  "kwh-calculator": [
    {
      question: "How do I calculate kWh from watts?",
      answer: "Multiply the wattage of the device by the number of hours it runs per day, then divide by 1,000 to convert from watt-hours to kilowatt-hours (kWh).",
    },
    {
      question: "What is a kilowatt-hour (kWh)?",
      answer: "A kilowatt-hour is a measure of energy equal to 1,000 watts of power sustained for one hour. It is the standard billing unit used by utility companies to charge for electricity.",
    },
    {
      question: "How much is 1 kWh in dollars?",
      answer: "The cost of 1 kWh varies widely by location and utility provider, but the US national average is typically around $0.16 to $0.20 per kWh. Check your electricity bill for your exact rate.",
    },
  ],
  "generator-size-calculator": [
    {
      question: "What size generator do I need for my house?",
      answer: "Sum the running watts of all appliances you want to run simultaneously, then add the highest single starting watts requirement among them. Add a 20% safety margin to ensure the generator isn't overloaded.",
    },
    {
      question: "What is the difference between running watts and starting watts?",
      answer: "Running watts are the continuous power an appliance needs to operate. Starting watts (or surge watts) are the extra burst of power required for a few seconds to start electric motors, such as in refrigerators or AC units.",
    },
    {
      question: "Can I run my whole house on a 5000 watt generator?",
      answer: "A 5000W generator can power essential items like a refrigerator, lights, router, and TV, but it will not run a central air conditioner, electric range, or electric water heater simultaneously. Load management is required.",
    },
  ],
};
