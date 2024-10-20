package com.stc.collabothon.storage;

import com.stc.collabothon.model.offer.criteria.AgeCriteria;
import com.stc.collabothon.model.offer.criteria.CompanySizeCriteria;
import com.stc.collabothon.model.offer.criteria.EligibilityCriteria;
import fuzzy4j.sets.FuzzyFunction;
import fuzzy4j.sets.TrapezoidalFunction;
import fuzzy4j.sets.TriangularFunction;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Getter
@Component
public class MembershipFunctionStorage {


    private final Map<EligibilityCriteria, FuzzyFunction> individualFinancialStatusMembershipFunction = new HashMap<>();
    private final Map<EligibilityCriteria, FuzzyFunction> corporateFinancialStatusMembershipFunction = new HashMap<>();

    private final Map<AgeCriteria, FuzzyFunction> ageMembershipFunction = new HashMap<>();
    private final Map<CompanySizeCriteria, FuzzyFunction> companySizeMembershipFunction = new HashMap<>();

    @PostConstruct
    public void init() {

        // Individual
        individualFinancialStatusMembershipFunction.put(EligibilityCriteria.LOW_INCOME, new TrapezoidalFunction(0,0,5000,10000));
        individualFinancialStatusMembershipFunction.put(EligibilityCriteria.MIDDLE_INCOME, new TrapezoidalFunction(9000,15000,25000,30000));
        individualFinancialStatusMembershipFunction.put(EligibilityCriteria.UPPER_MIDDLE_INCOME, new TriangularFunction(24000, 40000, 66000));
        individualFinancialStatusMembershipFunction.put(EligibilityCriteria.HIGH_INCOME, new TriangularFunction(50000, 100000, 150000));
        individualFinancialStatusMembershipFunction.put(EligibilityCriteria.ULTRA_HIGH_NET_WORTH, new TrapezoidalFunction(140000,500000,1000000,1000000));

        // Corporate
        corporateFinancialStatusMembershipFunction.put(EligibilityCriteria.LOW_INCOME, new TrapezoidalFunction(0,0,50000,100000));
        corporateFinancialStatusMembershipFunction.put(EligibilityCriteria.MIDDLE_INCOME, new TrapezoidalFunction(90000,150000,250000,300000));
        corporateFinancialStatusMembershipFunction.put(EligibilityCriteria.UPPER_MIDDLE_INCOME, new TriangularFunction(240000, 400000, 660000));
        corporateFinancialStatusMembershipFunction.put(EligibilityCriteria.HIGH_INCOME, new TriangularFunction(500000, 1000000, 1500000));
        corporateFinancialStatusMembershipFunction.put(EligibilityCriteria.ULTRA_HIGH_NET_WORTH, new TrapezoidalFunction(1400000,5000000,10000000,10000000));

        //Age
        ageMembershipFunction.put(AgeCriteria.YOUNG, new TrapezoidalFunction(18,18,23, 28));
        ageMembershipFunction.put(AgeCriteria.STUDENT, new TrapezoidalFunction(19,19,21, 26));
        ageMembershipFunction.put(AgeCriteria.MIDDLE_AGED, new TriangularFunction(30, 50, 70));
        ageMembershipFunction.put(AgeCriteria.PENSIONER, new TrapezoidalFunction(50, 80, 100, 100));
        ageMembershipFunction.put(AgeCriteria.OLD, new TrapezoidalFunction(70, 90,100,100));

        //Company size
        companySizeMembershipFunction.put(CompanySizeCriteria.SMALL, new TrapezoidalFunction(0,0, 10, 40));
        companySizeMembershipFunction.put(CompanySizeCriteria.MEDIUM, new TriangularFunction(20, 50, 80));
        companySizeMembershipFunction.put(CompanySizeCriteria.BIG, new TrapezoidalFunction(40, 100, 300, 300 ));


        System.out.println("INIT FINISHED");
        System.out.println(individualFinancialStatusMembershipFunction);
    }



}
